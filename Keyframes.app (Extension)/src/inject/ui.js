// Inject.js
// Show loading, pull data.
console.log("UI Preparing...")

// Append CSS File to head
$("head").append('<link href="' + chrome.extension.getURL('src/inject/ui/keyframes.css') + '" rel="stylesheet">');


// Append timeline
$.get(chrome.extension.getURL('src/inject/ui/floatingElements.html'), function (data) {
    $("body").append(data);
});


function keyframesToast(message){


    setTimeout(function(){
        $("#tappToast").text(message);
        $( "#tappToast" ).animate({
            left: "0px"
        }, 250, function() {});
    }, 100);

    setTimeout(function(){
        $( "#tappToast" ).animate({
            left: "-240px"
        }, 250, function() {});
    }, 4000);

}

keyframesToast("Click on an element you would like to animate.");



// Get target element from page
var targetElementSelected = false;
$('body').children().mouseover(function(e){
    if(!targetElementSelected){
        $(".tapp-element-picker").removeClass("tapp-element-picker");
        $(e.target).addClass("tapp-element-picker");
    }
  return false;
}).mouseout(function(e) {
    if(!targetElementSelected){
        $(this).removeClass("tapp-element-picker");
    }
});

var keyframeTargetElement;
$(document).click(function(event) {

    if(!targetElementSelected){

        $(".tapp-element-picker").removeClass("tapp-element-picker");
        event.preventDefault();
        keyframeTargetElement = event.target;
        targetElementSelected = true;

        console.log("Target element selected:");
        console.log(keyframeTargetElement);

        // Inject HTML Content
        // Append sidebar
        $.get(chrome.extension.getURL('src/inject/ui/sidebar.html'), function (data) {
            $("body").append(data);
        });
        // Append timeline
        $.get(chrome.extension.getURL('src/inject/ui/timeline.html'), function (data) {
            $("body").append(data);
        });


    }else{
        return;
    }


});






// Dont forget to remove everything on close.
