# ucr_mfa_crx

A chrome extension for bypass ucr mfa. This extension is based on the Passcode feature provided by [this](https://myaccount.ucr.edu/app/home). You should only use it at your own broswer. This extesnsion will be not conflict with any other MFA methods, for instance DUO mobile or SMS, unless you also use passcode manually. We will NOT upload your MFA OTP to anywhere. So feel free to use it. 

## Way to hack it

Inject js code one the MFA page. After MFA passed. We perform fetching from [this link](https://myaccount.ucr.edu/api/downloadPasscodes).
After parsing it and store it locally, we could automatic fill the code next time.
Note that you can fecth 10 OTP per request. So we could perform fecthing after evert 9 time logins to reduce the frequent to request the api.

## NOTE

This extension is still under developing.

I currently know how to do it. And tested pass manually. But I need time to do it. So please wait in patient. Thanks.

If you are interested in this project, please email me.
ymj777905@gmail.com