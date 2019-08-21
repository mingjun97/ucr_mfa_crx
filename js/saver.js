function save(){
    var enb = document.getElementById('enb');
    var loading = document.getElementById('loading');
    var netid = document.getElementById('netid');
    var password = document.getElementById('password');
    if (netid.value.length != 0 && password.value.length != 0){
        chrome.storage.local.set(
            {"username": netid.value,
            "password": password.value,
            "autologin": true
            }
        ,function(){
            var bg = chrome.extension.getBackgroundPage();
            bg.setup();
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
    document.getElementById('password').addEventListener('keyup', function(event){
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("enb").click();
        }
    });
    update_me();
    var elems = document.querySelectorAll('.tooltipped');
    M.Tooltip.init(elems);
    document.getElementById('autologin').addEventListener('click', update_autologin);
}

function update_autologin(){
    chrome.storage.local.set({autologin:document.getElementById('autologin').checked});
}

function update_me(){
    var status = document.getElementById('status');
    status.addEventListener('click', update_status);
    chrome.storage.local.get({keys: [], username: '', autologin: false}, function(data){
        document.getElementById('netid').value = data.username;
        M.updateTextFields();
        if (data.autologin){
            document.getElementById('autologin').checked = true;
        }
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