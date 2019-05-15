# ucr_mfa_crx

![Showcase](wiki/Showcase.gif)

A chrome extension for auto-filling ucr mfa. This extension is based on the Passcode feature provided by [this](https://myaccount.ucr.edu/app/home). You should only use it at your own machine. This extesnsion will be not conflict with any other MFA methods, for instance DUO mobile or SMS, unless you also use Passcode manually. We currently do **NOT** upload your MFA Passcode to anywhere. Your security very matters. Feel free to use it.

## Usage

 1. [Download](https://github.com/mingjun97/ucr_mfa_crx/releases/download/v1.0.2/ucr_mfa_crx.zip) package and decompress it.
 2. Open [chrome://extensions](chrome://extensions), toggle `Developer Mode` and refresh this page. Then click `Load Unpacked` and navigate to `ucr_mfa_crx` to install it.
 ![Installation](wiki/Installation.gif)
 3. Login https://myaccount.ucr.edu/app/home, you could use any MFA method.
 ![Login](wiki/Login.gif)
 4. Click the extension(typically it's on your top-right corner), input your NetID and password.
 5. Click enable, wait for a while. If the switch toggle to on, then you are all set! Otherwise, you may open an issue or contact me. **NOTE**: Make sure you login to webpage shown below.
 ![Enable](wiki/Enable.gif)

## Way to implement it

Inject js code one the MFA page. After MFA passed. We perform fetching from [this link](https://myaccount.ucr.edu/api/downloadPasscodes).
After parsing and store it locally, we could automatic fill the code next time.
Note that you can fecth 10 Passcodes per request. So we will perform fetching new Passcodes after every 9 time logins to keep this extension always works.

## NOTE

**This extension will store your NetID and password locally to retrieve new Passcode on demand.**

You may open the popup window by clicking the icon in top-right corner to check the extension status at any time.

If you are interested in this tweak or have any questions, please email me.
ymj777905@gmail.com

## TODO

- [ ] Sync Passcodes with your google account.