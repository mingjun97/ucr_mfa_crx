# ucr_mfa_crx

A chrome extension for bypass ucr mfa. This extension is based on the Passcode feature provided by [this](https://myaccount.ucr.edu/app/home). You should only use it at your own machine. This extesnsion will be not conflict with any other MFA methods, for instance DUO mobile or SMS, unless you also use Passcode manually. We currently do **NOT** upload your MFA Passcode to anywhere. Your security very matters. Feel free to use it.

## Usage

 1. Install ucr_mfa_crx following this [link](https://github.com/web-scrobbler/web-scrobbler/wiki/Install-an-unpacked-extension)
 2. Login https://myaccount.ucr.edu/app/home, you could use any MFA method.
 3. Click the extension(typically it's on your top-right corner), input your NetID and password.
 4. Click enable, wait for a while. If the switch toggle to on, then you are all set! Otherwise, you may open an issue or contact me.

## Way to implement it

Inject js code one the MFA page. After MFA passed. We perform fetching from [this link](https://myaccount.ucr.edu/api/downloadPasscodes).
After parsing and store it locally, we could automatic fill the code next time.
Note that you can fecth 10 Passcodes per request. So we will perform fetching new Passcodes after every 9 time logins to keep this extension always works.

## NOTE

**This extension will store your NetID and password locally to retrieve Passcode on demand.**

You may open the popup window by clicking the icon in top-right corner to check the extension status at any time.

If you are interested in this tweak or have any questions, please email me.
ymj777905@gmail.com

## TODO

[] Sync Passcodes with your google account.