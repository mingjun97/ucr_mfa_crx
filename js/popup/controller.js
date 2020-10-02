function save(){
    var enb = document.getElementById('enb');
    var loading = document.getElementById('loading');
    var netid = document.getElementById('netid');
    var password = document.getElementById('password');
    var synced = document.getElementById('sync');

    var cb = function(){
        var bg = chrome.extension.getBackgroundPage();
        bg.setup();
        enb.style = "display: none;"
        loading.style = "display: flex;"
    };
    if (netid.value.length != 0 && password.value.length != 0){
        chrome.storage.local.get({synced: false}, function(data){
            if (data.synced){
                chrome.storage.sync.set(
                    {
                        "username": netid.value,
                        "password": password.value,
                        "autologin": true,
                    }, cb);
            }else{
                chrome.storage.local.set(
                {
                    "username": netid.value,
                    "password": password.value,
                    "autologin": true,
                },cb);
            }
        })
    }
}

function update_status(){
    var status = document.getElementById('status');
    if (!status.checked){
        chrome.storage.local.get({synced: false}, function(data){
            if (data.synced){
                chrome.storage.sync.set({"keys": []}, update_me);
            }else{
                chrome.storage.local.set({"keys": []}, update_me);
            }
        });
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
    document.getElementById('sync').addEventListener('click', function(){
        chrome.storage.local.get({synced: false}, function(data){
            if (data.synced){ // Turning off sync
                chrome.storage.sync.get({keys: [], netid: null, password: null, autologin: false}, function(data){
                    chrome.storage.local.set(data, function() {
                        if(confirm("Do you want to delete synced data on cloud? (Credentials, Passcodes, etc.)\n\n    Cancel for NOT, OK for DELETE")){
                            chrome.storage.sync.set({keys: [], netid: null, password: null, autologin: false});
                        }
                    });
                })
            }else{ // Turning on sync
                chrome.storage.sync.get({keys: []}, function(data){
                    if (data.keys.length == 0) { // dont have synced passcodes on cloud
                        chrome.storage.local.get({keys: [], netid: "", password: "", autologin: true}, function(data){
                            chrome.storage.sync.set(data, update_me);
                        })
                    }else{ // have synced passcodes on cloud
                        chrome.storage.local.get({keys: [], netid: "", password: "", autologin: true}, function(data){
                            if (data.keys.length > 0){
                                if(confirm("We notice that you have credentials saved on cloud but we don't know which is the latest one.\nDo you want to use local credentials override cloud data? (Credentials, Passcodes, etc.)\n\n    Cancel for NOT, OK for OVERRIDE")){
                                    // override
                                    chrome.storage.sync.set(data);
                                }
                            }
                        })
                    }
                })
            }
        })
        chrome.storage.local.set({synced: document.getElementById('sync').checked}, update_me);
    });
    document.getElementById('status').addEventListener('click', update_status);
    update_me();
    var elems = document.querySelectorAll('.tooltipped');
    M.Tooltip.init(elems);
    document.getElementById('autologin').addEventListener('click', update_autologin);
    document.getElementById('autopush').addEventListener('click', update_autopush);
    document.getElementById('githublink').onclick = PopOutGithub;

}

function update_autologin(){
    chrome.storage.local.get({synced: false}, function(data){
        if(data.synced){
            chrome.storage.sync.set({autologin:document.getElementById('autologin').checked});
        }else{
            chrome.storage.local.set({autologin:document.getElementById('autologin').checked});
        }
    })
}

function update_autopush(){
    chrome.storage.local.get({synced: false}, function(data){
        if(data.synced){
            chrome.storage.sync.set({autopush:document.getElementById('autopush').checked});
        }else{
            chrome.storage.local.set({autopush:document.getElementById('autopush').checked});
        }
    })
}

function update_me(){
    var status = document.getElementById('status');
    var update_handler = function(data){
        document.getElementById('netid').value = data.username;
        M.updateTextFields();
        if (data.autologin){
            document.getElementById('autologin').checked = true;
        }
        if (data.autopush){
            document.getElementById('autopush').checked = true;
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
    };
    chrome.storage.local.get({synced: false}, function(data){
        document.getElementById("sync").checked = data.synced;
        if (data.synced){ // synced with google account
            chrome.storage.sync.get({keys: [], username: '', autologin: false, autopush: false}, update_handler);
        }else{ // not synced with google account
            chrome.storage.local.get({keys: [], username: '', autologin: false, autopush: false}, update_handler);
        }
    })
}
document.addEventListener('DOMContentLoaded', initialize);
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if (request === 'update_status'){
        update_me();
    }
});

function PopOutGithub(){
    chrome.tabs.create({ url: "https://github.com/mingjun97/ucr_mfa_crx" }, null)
}