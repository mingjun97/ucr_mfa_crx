function injectCustomJs(jsPath)
{
    jsPath = jsPath || 'js/inject.js';
    var temp = document.createElement('script');
    temp.setAttribute('type', 'text/javascript');
    temp.src = chrome.extension.getURL(jsPath);
    document.head.appendChild(temp);
}

injectCustomJs("js/login_inject.js");

setTimeout( function(){
    chrome.storage.local.get({username:'unknown', password: 'unknown', initial: false, autologin: false, lastLogin: 0}, function(data){
        if (data.initial || data.autologin){
            if (Date.now() - data.lastLogin > 1000) { // if last tried within 1 second then bypass login this time
                if (data.username != 'unknown')
                    window.postMessage({"username": data.username, "password": data.password},"*")
                chrome.storage.local.set({lastLogin: Date.now()})
            }
        }
    });
}, 100);
