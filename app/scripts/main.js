$(function () {
    $('form').on('submit', function (e) {
        e.preventDefault();
    });

    $('button.amf').click(submitAMF);
    $('button.json').click(submitJSON);
});

var displayInfo = function (response) {
    var data = {};
    $.each(response, function (i, element) {
        data[element.name] = element.value;
    });

    var infoBox = $('#infoBox');
    var text = data.firstName + ' ' + data.lastName + ' has signed up with an email address of ' + data.emailAddress
        + '. ' + (data.gender == 'male' ? 'He' : 'She') + ' has '
        + (data.spamMe ? '' : 'not') + ' agreed to be spammed.';

    infoBox.text(text);
    infoBox.show();
};

/**
 * Submit form as JSON
 */
var submitJSON = function () {
    $('#infoBox').hide();
    $('#infoBox').text('');

    $.ajax({
        data: JSON.stringify($('#registrationForm').serializeArray()),
        url: '/server/json.php',
        dataType: 'json',
        contentType: 'text/json',
        type: 'POST',
        success: function (responseData) {
            displayInfo(responseData);
        }
    });
};

/**
 * Submit form as AMF
 */
var submitAMF = function () {
    $('#infoBox').hide();
    $('#infoBox').text('');

    // send as stream of bytes
    var xhrSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function (data) {
        var numBytes = data.length, byteArray = new Uint8Array(numBytes);
        for (var i = 0; i < numBytes; i++) {
            byteArray[i] = data.charCodeAt(i) & 0xFF;
        }

        xhrSend.apply(this, [byteArray]);
    };

    $.ajax({
        data: AMF.stringify($('#registrationForm').serializeArray()),
        processData: false,
        beforeSend: function(xhr) {
            xhr.overrideMimeType("application/x-amf; charset=x-user-defined");
        },
        url: '/server/amf.php',
        type: 'POST',
        contentType: 'application/x-amf',
        success: function (responseData) {
            displayInfo(AMF.parse(responseData));
        }
    });

    // restore send
    XMLHttpRequest.prototype.send = xhrSend;
};