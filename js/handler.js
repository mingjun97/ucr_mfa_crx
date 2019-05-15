function injectCustomJs(jsPath)
{
    jsPath = jsPath || 'js/inject.js';
    var temp = document.createElement('script');
    temp.setAttribute('type', 'text/javascript');
    temp.src = chrome.extension.getURL(jsPath);
    document.head.appendChild(temp);
}

injectCustomJs();
window.addEventListener("message", function(e){
    if (e.data.retrieve === 'code'){
        chrome.storage.local.get({keys: [], initial: false}, function(items){
            if(items.keys.length < 3 && !items.initial){
                    chrome.runtime.sendMessage('GetCodes');
            }
            window.postMessage({"keys": items.keys.pop()})
            chrome.storage.local.set({keys: items.keys}, null);
        })
    }
})