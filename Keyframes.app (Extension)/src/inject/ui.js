// Inject.js
// Show loading, pull data.
console.log("UI Preparing...")

// Append CSS File to head
$("head").append('<link href="' + chrome.extension.getURL('src/inject/ui/css/keyframes.css') + '" rel="stylesheet">');


// Append timeline
$.get(chrome.extension.getURL('src/inject/ui/floatingElements.html'), function (data) {
    $("body").append(data);
});


function keyframesToast(message){


    setTimeout(function(){
        $("#kfToast").text(message);
        $( "#kfToast" ).animate({
            left: "0px"
        }, 250, function() {});
    }, 100);

    setTimeout(function(){
        $( "#kfToast" ).animate({
            left: "-240px"
        }, 250, function() {});
    }, 4000);

}

keyframesToast("Click on an element you would like to animate.");



// Get target element from page
var targetElementSelected = false;
$('body').children().mouseover(function(e){
    if(!targetElementSelected){
        $(".kf-element-picker").removeClass("kf-element-picker");
        $(e.target).addClass("kf-element-picker");
    }
  return false;
}).mouseout(function(e) {
    if(!targetElementSelected){
        $(this).removeClass("kf-element-picker");
    }
});

var keyframeTargetElement;
$(document).click(function(event) {

    if(!targetElementSelected){

        $(".kf-element-picker").removeClass("kf-element-picker");
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
