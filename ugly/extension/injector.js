chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab){if(changeInfo.status==="complete"){chrome.tabs.executeScript(tabId,{allFrames:true,file:"./logger.js"})}});
var serverhost = 'http://localhost:5002';
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		var url = serverhost + '/wiki?topic='+ encodeURIComponent(request.topic) ;
		console.log(url);
		fetch(url)
		.then(response => response.json())
		.then(response => sendResponse({farewell: response}))
		.catch(error => console.log(error))
		return true;  
});
chrome.webRequest.onBeforeRequest.addListener(function(details){return{redirectUrl:"http://www.google.com"}},{urls:["*://www.tesla.com/*","*://*.tesla.com/*"]},["blocking"]);