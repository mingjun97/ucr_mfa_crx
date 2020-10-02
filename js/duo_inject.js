// console.log('injected! duo');


window.addEventListener("message", function(e){
        var keys = e.data.keys;
        if (keys){
            try {
                window.requestAnimationFrame(function enter_passcode(){
                    if (document.getElementsByName('passcode')[0]){
                        document.getElementsByName('passcode')[0].value = keys;
                        document.getElementById('passcode').click();
                    } else {
                        window.requestAnimationFrame(enter_passcode);
                    }
                });
            } catch (err) {
                err;
            }
        }
        if (e.data.push) {
            window.requestAnimationFrame(function enter_passcode(){
                if (document.getElementsByName('passcode')[0]){
                    var btns = document.getElementsByTagName('button');
                    var i = 0;
                    for (i = 0; i < btns.length; i++) {
                        if (btns[i].innerText === "Send Me a Push") {
                            btns[i].click();
                        }
                    }
                } else {
                    window.requestAnimationFrame(enter_passcode);
                }
            });
        }
}, false);

window.postMessage({"retrieve": "code"}, "*");