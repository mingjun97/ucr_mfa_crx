


function getCode(){
    var msg = $.get("https://myaccount.ucr.edu/api/downloadPasscodes",function(data) {
        var msg = data;
        var c = msg.split('\r\n\r\n');
        var r = []
        for (var i = 0; i < c.length; i++){
            if (c[i].length === 9){
                r.push(c[i])
            }
        }
        if (r.length > 5){ // should be equal with 10
            chrome.storage.local.set({keys: r, initial: false}, function(){ 
                chrome.runtime.sendMessage('update_status');
            });
        }
    });
}

function getCodeWithCheck(){
    chrome.storage.local.get({initial: false}, function(data){
        setTimeout( function (){
        if (data.initial) {
            $.get("https://myaccount.ucr.edu/api/user/1").done(function(data){
                if (data.success)  getCode();
            });
        }
        }, 3000);
    })
}

$(document).ready(getCodeWithCheck);