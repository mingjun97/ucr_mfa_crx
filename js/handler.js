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
    var cb = function(items){
        if(items.keys.length < 3 && !items.initial){
                chrome.runtime.sendMessage('GetCodes');
        }
        window.postMessage({"keys": items.keys.pop()})
        if (items.isCurrentSynced){
            chrome.storage.sync.set({keys: items.keys}, null);
        }else{
            chrome.storage.local.set({keys: items.keys}, null);
        }
    };
    if (e.data.retrieve === 'code'){
        chrome.storage.local.get({synced: false}, function(data){
            if (data.synced){
                chrome.storage.sync.get({keys: [], initial: false, isCurrentSynced: true}, cb);
            }else{
                chrome.storage.local.get({keys: [], initial: false, isCurrentSynced: false}, cb);
            }
        })
    }
})