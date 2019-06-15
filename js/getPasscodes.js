


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
                document.body.innerHTML = `
                <h1>UCR MFA CRX Notification</h1>
                <div> Congraduations! You're all set! This window will be closed within <span id="ucr_mfa_crx_timer"> 3 </span> seconds. </div>
                `;
                setInterval(function(){ document.getElementById("ucr_mfa_crx_timer").innerText = ucr_mfa_crx_timer; ucr_mfa_crx_timer--;}, 1000);
                var t = document.createElement('iframe'); //logout
                t.src = 'https://myaccount.ucr.edu/app/logout';
                t.style.display = 'none';
                document.body.appendChild(t);
            });
        }
    });
}

var ucr_mfa_crx_timer = 2; 

function getCodeWithCheck(){
    clearInterval(timer);
    if (counter++ > 5) {return;}
    chrome.storage.local.get({initial: false}, function(data){
        if (data.initial) {
            $.get("https://myaccount.ucr.edu/api/user/1").done(function(data){
                if (data.success)  {
                    getCode();}
                else {
                    timer = setInterval(
                        function(){
                            if (window.location.href === "https://myaccount.ucr.edu/app/home"){
                                getCodeWithCheck();
                            }
                        }
                        ,1000
                    )
                    $.get("https://myaccount.ucr.edu/app/home")
                }
            });
        };
    })
}

var counter = 0;
var timer = 
setInterval(
    function(){
        if (window.location.href === "https://myaccount.ucr.edu/app/home"){
            getCodeWithCheck();
        }
    }
    ,500
);