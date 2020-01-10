# ucr_mfa_crx

**Breaking News**: Now available in chrome extension store! [Click](https://chrome.google.com/webstore/detail/ucr-mfa/oddbinhopeegfapdcgdgpbdcacoekbpa)

![Showcase](wiki/Showcase.gif)

A chrome extension for auto-filling ucr mfa. This extension is based on the Passcode feature provided by [this](https://myaccount.ucr.edu/app/home). You should only use it at your own machine. This extesnsion will be not conflict with any other MFA methods, for instance DUO mobile or SMS, unless you also use Passcode manually. We currently do **NOT** upload your MFA Passcode to anywhere unless you enable **sync**. Your security very matters.

**SYNC are available now!** All your crendentials are managed/synced by google if you enable *SYNC*.

## Usage

 1. [Install](https://chrome.google.com/webstore/detail/ucr-mfa/oddbinhopeegfapdcgdgpbdcacoekbpa) extension.
 2. Click the extension(typically it's on your top-right corner), input your NetID and password. Click enable, wait for a while, finish authentication inside the popuped window.

## Way to implement it

Inject js code on the MFA page. After MFA authencated. We download passcodes via https://myaccount.ucr.edu/api/downloadPasscodes, which is an API for download passcodes.
Then store it locally/in google account. Once there is a MFA form activated, this extension could retrieve the saved passcode and fill the form automatically.
A batch of downloaded passcodes has ten valid records, thus this extension will download passcodes every 7 filling occured under the aim of maintain persistence.

**You may receive email from UCR System to inform you someone has downloaded the passcodes, that excatly what this extension did.**

## NOTE

**This extension will store your NetID and password locally to retrieve new Passcode on demand.**

You may open the popup window by clicking the icon in top-right corner to check the extension status at any time.

If you are interested in this tweak or have any questions, please email me.
ymj777905@gmail.com

## TODO

- [x] Sync Passcodes with your google account.