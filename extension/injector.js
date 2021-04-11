// Access chrome tabs and listen to the tab information whenever it is updated
// Like whenever is is opened or refreshed
// tab_id = the identification number of the tab
// change_info = shows the changes to the state of the tab
// tab = gives state of tab that was updated

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    // Once the page has finished updating the changeInfo will show complete
    if (changeInfo.status === 'complete') {
        // executes javascript or css on the tab with tabId
        chrome.tabs.executeScript(tabId, {
            // applies the script to all frames not just the top frame
            allFrames: true,
            // the actual file being executed
            file: './logger.js'
            
        });
    }
});

var serverhost = 'http://localhost:5002';

	chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse) {
		  
			  
			var url = serverhost + '/wiki?topic='+ encodeURIComponent(request.topic) ;
			
			console.log(url);
				
			fetch(url)
			.then(response => response.json())
			.then(response => sendResponse({farewell: response}))
			.catch(error => console.log(error))
				
			return true;  // Will respond asynchronously.
		  
	});
