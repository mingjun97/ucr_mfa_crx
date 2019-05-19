var poped = undefined;

function setup(){
    chrome.storage.local.set({initial: true, setup: true}, function(){
        // chrome.tabs.create({ url: "https://myaccount.ucr.edu/app/home" });
        poped = chrome.windows.create({ url: "https://myaccount.ucr.edu/app/home", type: 'popup' }, function(window){
            poped = window.id;
        })
    });
}

function initial(){
    var a = document.createElement('iframe');
    a.src = "https://myaccount.ucr.edu/app/home";
    chrome.storage.local.set({initial: true}, function(){
        document.body.append(a);
    });
    setTimeout(function(){
        document.body.removeChild(a);
    }, 10000);
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if (request === 'GetCodes') {initial();}
    if (request === 'update_status'){
        chrome.storage.local.get({setup: false, initial: false}, function(items){
            if (items.setup){
                chrome.storage.local.set({setup: false}, function(){
                    chrome.notifications.create({
                        "message" : "Congratulations! UCR MFA Setup success. You're all set.",
                        "title" : "UCR MFA Setup Notification",
                        "type" : "basic",
                        "iconUrl": "img/icon.png"
                    }); 
                })
                if (poped) {setTimeout(function(){
                    chrome.windows.remove(poped);
                    poped = undefined;
                }, 3000)}
            }
        });
    }

})