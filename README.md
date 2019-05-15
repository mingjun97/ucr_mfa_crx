# ucr_mfa_crx

A chrome extension for bypass ucr mfa. This extension is based on the Passcode feature provided by [this](https://myaccount.ucr.edu/app/home). You should only use it at your own machine. This extesnsion will be not conflict with any other MFA methods, for instance DUO mobile or SMS, unless you also use Passcode manually. We will **NOT** upload your MFA Passcode to anywhere. Your security matters. Feel free to use it.

## Usage

 1. Install crx following this [link](https://github.com/web-scrobbler/web-scrobbler/wiki/Install-an-unpacked-extension)
 2. Please use any MFA method, login https://myaccount.ucr.edu/app/home
 3. Click the extension(typically it's on your top-right corner), input your NetID and password.
 4. Click enable, wait for a while, and you are all set!

## Way to hack it

Inject js code one the MFA page. After MFA passed. We perform fetching from [this link](https://myaccount.ucr.edu/api/downloadPasscodes).
After parsing it and store it locally, we could automatic fill the code next time.
Note that you can fecth 10 OTP per request. So we could perform fecthing after evert 9 time logins to reduce the frequent to request the api.

## NOTE

This extension is still under developing.

I currently know how to do it. And tested pass manually. But I need time to do it. So please wait in patient. Thanks.

If you are interested in this project, please email me.
ymj777905@gmail.com