chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
        chrome.tabs.executeScript(tabId, {
            allFrames: true,
            file: './logger.js'
        });
    }
});
