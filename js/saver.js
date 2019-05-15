function save(){
    var enb = document.getElementById('enb');
    var loading = document.getElementById('loading');
    var netid = document.getElementById('netid');
    var password = document.getElementById('password');
    if (netid.value.length != 0 && password.value.length != 0){
        chrome.storage.local.set(
            {"username": netid.value,
            "password": password.value,
            "keys": [document.getElementById('otp').value]
            }
        ,function(){
            var bg = chrome.extension.getBackgroundPage();
            bg.initial();
            enb.style = "display: none;"
            loading.style = "display: flex;"
        })
    }
}

function update_status(){
    var status = document.getElementById('status');
    if (!status.checked){
        chrome.storage.local.set(
            {
            "keys": []
            }, update_me);
    }else{
    }
}
function initialize(){
    document.getElementById('enb').addEventListener('click', save);
    update_me();
}

function update_me(){
    var status = document.getElementById('status');
    status.addEventListener('click', update_status);
    chrome.storage.local.get({keys: [], username: ''}, function(data){
        document.getElementById('netid').value = data.username;
        M.updateTextFields();
        if (data.keys.length) {
            status.checked = true;
            status.disabled = false;
            document.getElementById('enb').style = "display: inline-block;"
            document.getElementById('enb').classList.add('disabled');
            document.getElementById('loading').style = "display: none;"
        }else{
            status.checked = false;
            status.disabled = true;
            document.getElementById('enb').style = "display: inline-block;"
            document.getElementById('enb').classList.remove('disabled');
            document.getElementById('loading').style = "display: none;"
        }
    })
}
document.addEventListener('DOMContentLoaded', initialize);
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if (request === 'update_status'){
        update_me();
    }
});