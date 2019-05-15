function enterPasscode() {
    if (!$('#passcodeStep1').val()) {
        return;
    }
    showSnackbar('Validating passcode...', snackbarTypes.info, 'Cancel');
    $('.step-1').find('button').attr('disabled', 'disabled');
    sendDuoCommand(accessToken, netId, duoCommands.passcode, $('#passcodeStep1').val(), function (res) {
        submitCasForm();
        showSnackbar(res.userMessage, snackbarTypes.info, null);
    }, function (jqXHR, textStatus, errorThrown) {
        $('.step-1').find('button').removeAttr('disabled');
        showSnackbar("Invalid passcode, please try again...", snackbarTypes.error, 'Dismiss');
    });
}
window.addEventListener("message", function(e){
    var keys = e.data.keys;
    document.getElementById('passcodeStep1').value = keys;
    enterPasscode()
}, false);
window.postMessage({"retrieve": "code"}, "*");

