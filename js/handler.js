function injectCustomJs(jsPath)
{
    jsPath = jsPath || 'js/inject.js';
    var temp = document.createElement('script');
    temp.setAttribute('type', 'text/javascript');
    // 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
    temp.src = chrome.extension.getURL(jsPath);
    document.head.appendChild(temp);
}

injectCustomJs();
window.addEventListener("message", function(e){
    if (e.data.retrieve === 'code'){
        chrome.storage.local.get({keys: []}, function(items){
            if(items.keys.length < 3){
                    chrome.runtime.sendMessage('GetCodes');
            }
            window.postMessage({"keys": items.keys.pop()})
            chrome.storage.local.set({keys: items.keys}, null);
        })
    }
})