// Listen for message from content.js to inject an icon into the Ads UI.
// chrome.runtime.onMessage.addListener(
//     function(request, sender, sendResponse) {
//         if (request.contentScriptQuery == "fetchImage") {
//             sendResponse({url: chrome.runtime.getURL(request.path)});
//         }
//         return true;
//     });
