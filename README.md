# AdsTools - Power Tools For Paid Advertising Experts
This is a chrome/firefox extension that adds some much-needed
features to Google Ads, Microsoft ads and other paid advertising
platforms. 

Currently, the alpha contains: 
* Stop to Google Ads notification popup from blocking the search bar output.
* Query ChatGPT when creating Responsive Search Ads and Performance Max (Pmax) asset groups.

Future plans:
Graphing multiple metrics in the Google Ads UI
Bigger charts in the Google Ads UI.
Forecast integration.

## Folder Structure
The folder structure is as follows:

```
adstools/
├── extension/
│   ├── background.js
│   ├── content.js
│   ├── icons/
│   │   ├── icon16.png
│   │   ├── icon32.png
│   │   ├── icon48.png
│   │   └── icon128.png
│   ├── popup/
│   │   ├── popup.html
│   │   └── popup.js
│   └── manifest.json
├── src/
│   └── // source files for the extension
├── webpack.config.js
├── babel.config.js
├── package.json
└── node_modules/
    └── // dependencies installed by npm

```

## Getting Started
This is not ready for public consumption. Do not install or load. 


## Dev Notes
To access stored values in popup.js/html
```javascript
chrome.storage.local.get(['OPEN_API_KEY', 'GOOGLE_ADS_API_KEY', 'GPT_VERSION'], function(result) {
    console.log('Open API Key is ', result.OPEN_API_KEY);
    console.log('Google Ads API Key is ', result.GOOGLE_ADS_API_KEY);
    console.log('GPT Version is ', result.GPT_VERSION);
});

chrome.storage.local.get(['HIDE_NOTIFICATIONS', 'DISMISS_ADS'], function(result) {
    console.log('Value of HIDE_NOTIFICATIONS is ', result.HIDE_NOTIFICATIONS);
    console.log('Value of DISMISS_ADS is ', result.DISMISS_ADS);
});
```

### To Build
npm run watch
