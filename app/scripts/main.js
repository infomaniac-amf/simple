$(function () {
    $('form').on('submit', function (e) {
        e.preventDefault();
    });

    $('button.amf').click(submitAMF);
    $('button.json').click(submitJSON);
});

/**
 * Submit form as JSON
 */
var submitJSON = function () {
    $.ajax({
        data: JSON.stringify($('#registrationForm').serializeArray()),
        url: '/server/json.php',
        dataType: 'json',
        contentType: 'text/json',
        type: 'POST',
        success: function () {
            console.log(this);
        }
    });
};

/**
 * Submit form as AMF
 */
var submitAMF = function () {
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
        url: '/server/amf.php',
        type: 'POST',
        contentType: 'application/x-amf',
        mimeType: 'application/x-amf; charset:x-user-defined',
        success: function () {
            console.log(this);
        }
    });

    // restore send
    XMLHttpRequest.prototype.send = xhrSend;
};