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
    chrome.storage.local.get({username:'unknown', password: 'unknown', initial: false, autologin: false}, function(data){
        if (data.initial || data.autologin){
            if (data.username != 'unknown')
                window.postMessage({"username": data.username, "password": data.password},"*")
        }
    });
}, 100);
