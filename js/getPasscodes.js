


function getCode(){
    var msg = $.ajax({type: "GET", url: "https://myaccount.ucr.edu/api/downloadPasscodes", async: false}).responseText;

    var c = msg.split('\r\n\r\n');
    var r = []
    for (var i = 0; i < c.length; i++){
        if (c[i].length === 9){
            r.push(c[i])
        }
    }
    chrome.storage.local.set({keys: r, initial: false}, function(){ console.log(r)});
}

function getCodeWithCheck(){
    chrome.storage.local.get({initial: false}, function(data){
        if (data.initial) getCode();
    })
}

$(document).ready(getCodeWithCheck);