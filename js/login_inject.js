window.addEventListener(
    'message', function(e) {
            try {
                document.getElementById('username').value = e.data.username;
                document.getElementById('password').value = e.data.password;
                document.getElementById('fm1').submit();
            }
            catch(err){
                err;
            }
                
        }
);
