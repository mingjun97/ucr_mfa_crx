window.addEventListener(
    'message', function(e) {
            try {
                if(e.data.username){
                    document.getElementById('username').value = e.data.username;
                    document.getElementById('password').value = e.data.password;
                    document.getElementsByName('submit')[0].click();
                }
            }
            catch(err){
                err;
            }
                
        }
);
