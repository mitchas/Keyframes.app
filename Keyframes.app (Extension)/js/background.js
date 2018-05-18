chrome.browserAction.onClicked.addListener(function (tab) {
	// for the current tab, inject the "inject.js" file & execute it

    chrome.tabs.executeScript(tab.ib, {
		file: './src/inject/jquery.min.js'
	});

    chrome.tabs.executeScript(tab.ib, {
		file: './src/inject/ui.js'
	});

    chrome.tabs.executeScript(tab.ib, {
		file: './src/inject/functions.js'
	});

});


//
// "content_scripts": [
//     {
//         "matches": [
//             "<all_urls>"
//         ],
//         "js": [
//             "src/inject/inject.js"
//         ],
//         "run_at": "document_end"
//     }
// ]
