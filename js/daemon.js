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
                        "iconUrl": "img/icon.png",
                        "requireInteraction": true
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

chrome.storage.local.get({lastSeen: "1.0.0"}, function(data) {
    var version = chrome.runtime.getManifest().version;
    var message = ""
    if (data.lastSeen != version) {
        switch (version) {
            case "2.0.0":
                message = "Sync with google account available!"
                break;
            case "2.1.0":
                message = "Now works on new CAS system!"
                break;
        }
        chrome.notifications.create({
            "message" : message,
            "title" : "New feature! Please open UCR MFA Helper",
            "type" : "basic",
            "iconUrl" : "img/icon.png",
            "requireInteraction": true
        })
    }
    chrome.storage.local.set({lastSeen: version});
})