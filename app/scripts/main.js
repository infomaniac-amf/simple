$(function () {
    $('form').on('submit', function (e) {
        e.preventDefault();
    });

    $('button.amf').click(submitAMF);
    $('button.json').click(submitJSON);
});

var displayInfo = function (user) {
    var infoBox = $('#infoBox');
    var text = user.get('firstName') + ' ' + user.get('lastName')
        + ' has signed up with an email address of ' + user.get('emailAddress')
        + '. ' + (user.get('gender') == 'male' ? 'He' : 'She') + ' has '
        + (user.get('spamMe') ? '' : 'not') + ' agreed to be spammed.';

    infoBox.text(text);
    infoBox.show();
};

var getUserData = function () {
    var user = new User();
    user.set('firstName', $('#firstName').val());
    user.set('lastName', $('#lastName').val());
    user.set('emailAddress', $('#emailAddress').val());
    user.set('password', $('#password').val());
    user.set('spamMe', $('#spamMe').is(':checked'));
    user.set('gender', $('input[name="gender"]:checked').val());

    return user;
};

/**
 * Submit form as JSON
 */
var submitJSON = function () {
    var user = getUserData();

    $('#infoBox').hide();
    $('#infoBox').text('');

    $.ajax({
        data: user.exportData(),
        url: '/server/json.php',
        dataType: 'json',
        contentType: 'text/json',
        type: 'POST',
        success: function (responseData) {
            displayInfo(new User(responseData));
        }
    });
};

/**
 * Submit form as AMF
 */
var submitAMF = function () {
    var user = getUserData();

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
        data: AMF.stringify(user, AMF.CLASS_MAPPING),
        processData: false,
        url: '/server/amf.php',
        type: 'POST',
        contentType: 'application/x-amf',
        mimeType: 'application/x-amf; charset:x-user-defined',
        success: function (responseData) {
            displayInfo(AMF.parse(responseData));
        }
    });

    // restore send
    XMLHttpRequest.prototype.send = xhrSend;
};