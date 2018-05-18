chrome.runtime.sendMessage({type: "checkForExtension"}, function(response) {
    var data = response.data[0];
    document.dispatchEvent(new CustomEvent('extensionEvent', {detail: data}));
});
