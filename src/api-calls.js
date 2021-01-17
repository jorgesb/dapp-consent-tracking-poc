var apiUrl = 'http://localhost:3000/';
var addEndpoint = 'add/';
var getEndpoint = 'opt-action/';
var getTotalEndpoint = 'total/';
var checkEndpoint = 'check-exist/';
var balanceEndpoint = 'balance/';

function addOptAction() {
    $.ajax({
        method: "POST",
        url: apiUrl + addEndpoint,
        crossDomain: true,
        beforeSend: function (request) {
            request.setRequestHeader("Access-Control-Allow-Origin", "*");
        },
        data: {
            optAddress: $('#optAddress').val(),
            urn: $('#urn').val(),
            optId: $('#optId').val(),
            action: $('#action').val(),
            optText: $('#optText').val()
        }
    })
        .done(function (msg) {
            console.log("addOptAction - Data Saved: " + msg);
            $('#output').html("Data Saved: " + msg);
            clearForm();
        });
}

function getOptAction() {
    console.log('Getting opt action by address:' + apiUrl + getEndpoint + $('#requestOptAddress').val());
    $.ajax({
        method: "GET",
        url: apiUrl + getEndpoint + $('#requestOptAddress').val(),
    })
        .done(function (msg) {
            console.dir(msg);
            $('#urn').val(msg[0]);
            $('#optId').val(msg[1]);
            $('#action').val(msg[2]);
            $('#timestamp').val(msg[3]);
            $('#optText').val(msg[4]);
            $('#index').val(msg[5]);
            $('#output').html(msg);
        });
}

function getTotalOptActions() {
    console.log('Getting total of stored opt actions');
    $.ajax({
        method: "GET",
        url: apiUrl + getTotalEndpoint,
    })
        .done(function (msg) {
            console.log(msg);
            $('#output').html(msg);
        });
}

function clearForm() {
    $('#opt-form').find(':input').val('');
}


