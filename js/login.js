function injectCustomJs(jsPath)
{
    jsPath = jsPath || 'js/inject.js';
    var temp = document.createElement('script');
    temp.setAttribute('type', 'text/javascript');
    temp.src = chrome.extension.getURL(jsPath);
    document.head.appendChild(temp);
}

injectCustomJs("js/login_inject.js");

function sendCredentials(data){
    if (data.username != "unknown"){
        window.postMessage({"username": data.username, "password": data.password}, "*");
        chrome.storage.local.set({lastLogin: Date.now()});
    }
}

setTimeout( function(){
    chrome.storage.local.get({synced: false, initial: false, autologin: false, lastLogin: 0}, function(data){
        if (data.synced){
            // passcode synced
            if (data.initial && Date.now() - data.lastLogin > 1000){
                chrome.storage.sync.get({username: 'unknown', password: 'unknown'}, sendCredentials);
            }else if (Date.now() - data.lastLogin > 1000){
                chrome.storage.sync.get({autologin: false}, function(data){
                    if (data.autologin){
                        chrome.storage.sync.get({username: 'unknown', password: 'unknown'}, sendCredentials);
                    }
                });
            }
        }else{
            // passcode not synced
            if ((data.initial || data.autologin) && (Date.now() - data.lastLogin > 1000)){
                chrome.storage.local.get({username:'unknown', password: 'unknown'}, sendCredentials)
            }
        }
    })
}, 1000);
