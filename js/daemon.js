function initial(){
    var a = document.createElement('iframe');
    a.src = "https://myaccount.ucr.edu";
    chrome.storage.local.set({initial: true}, function(){
        document.body.append(a);
    });
    setTimeout(function(){
        document.body.removeChild(a);
    }, 10000);
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if (request === 'GetCodes') initial();
})