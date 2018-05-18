console.log("LINKEDIN")
console.log("LINKEDIN")
console.log("LINKEDIN")


var sendLinkedInData = function(){
    console.log("SENDING DATA");
    chrome.runtime.sendMessage({type: "getLinkedInResume"}, function(response) {
        var linkedInResume = response.data[0];
        document.dispatchEvent(new CustomEvent('ceevExEvent', {detail: linkedInResume}));
    });
}

window.addEventListener("load",function(){
    setTimeout(function(){
        sendLinkedInData();
    }, 1500);
});
