function save(){
    chrome.storage.local.set(
        {"username": document.getElementById('netid').value,
        "password": document.getElementById('password').value,
        "keys": [document.getElementById('otp').value]
        }
    ,function(){
        var bg = chrome.extension.getBackgroundPage();
        bg.initial();
    })
}
document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('enb').addEventListener('click', save);
    chrome.storage.local.get({keys: []}, function(data){
        if (data.keys.length) {
            document.getElementById('status').innerText = 'On';
        }
    })
});