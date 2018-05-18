$( document ).ready(function() {

    console.log("Page Loaded")

    // Append new target styles on load
    appendNewTargetStyles();
    appendNewStageStyles();
    changeStep('0');

});


// Set up variables
var currentStep = 0;

// Variable containing all steps
var transitions = {};


// Add new CSS Property to list
var propString = '<div class="tapp-prop"><div class="prop-input" contenteditable="true" placeholder="transform:" spellcheck="false" onchange="updateTargetStyles();"></div><div class="prop-input" contenteditable="true" placeholder="rotate(180deg);" spellcheck="false" onchange="updateTargetStyles();"></div></div>'
$("#newProperty").click(function(){
    // Stop animation
    stopAnimation();
    // Add new blank property
    $("#tappPropertyList").append(propString);
});



// Update data on page
function updatePageData(){
    // Update current step number
    $(".tapp-current-step").each(function(index) {
        $(this).text(currentStep);
    });
}

var targetStyles = "";
// Live update CSS on target element
function updateTargetStyles(){


    targetStyles = "";
    $("#tappPropertyList .tapp-prop").each(function(index) {
        targetStyles = targetStyles + $(this).text().replace(/\s/g, "");
    });

    // $("#transitionsTargetElement").css(targetStyles);
    $("#transitionsTargetElement").attr("style", targetStyles);


}


// Append target styles on change
function appendNewTargetStyles(){
    $("#targetCSSContainer").empty();
    $("#targetCSSContainer").append("#transitionsTargetElement{");
    $("#targetCSSContainer").append($("#targetCSSCode").text());
    $("#targetCSSContainer").append("}");
}
// Append stage styles on change
function appendNewStageStyles(){
    $("#stageCSSContainer").empty();
    $("#stageCSSContainer").append(".tapp-canvas{");
    $("#stageCSSContainer").append($("#stageCSSCode").text());
    $("#stageCSSContainer").append("}");
}


// Append styles to page
function appendStyles(){
    $("#styleContainer").empty();

    $("#styleContainer").append("@keyframes yourAnimation{");

    $.each(transitions, function (key, val) {
        $("#styleContainer").append(key + "%{" + val + "}");
    });
    $("#styleContainer").append("}\n")
    $("#styleContainer").append(".elementToAnimate{ animation: yourAnimation " + $("#animationProperties").text() + "}")
    $("#styleContainer").append(".animate-timeline-tracker{ animation: trackerAnimation " + $("#animationProperties").text() + "}")
}

function startAnimation(){
    $("#startAnimationButton").css('display','none');
    $("#stopAnimationButton").css('display','flex');
    changeStep(currentStep);
    appendStyles();
    $("#transitionsTargetElement").addClass("elementToAnimate");
    $("#timelineTracker").addClass("animate-timeline-tracker");
}
function stopAnimation(){
    $("#stopAnimationButton").css('display','none');
    $("#startAnimationButton").css('display','flex');
    $("#transitionsTargetElement").removeClass("elementToAnimate");
    $("#timelineTracker").removeClass("animate-timeline-tracker");
}

// Add a new step
// Or change to existing
function changeStep(percent){

    var newStepPercent = percent;
    var prevStep = currentStep;
    transitions[prevStep] = targetStyles;

    if(!transitions[newStepPercent]){
        transitions[newStepPercent] = targetStyles;
    }else{

        var stepProperties = transitions[newStepPercent].split(";");

        // Empty property list, add existing
        $("#tappPropertyList").empty();

        $(stepProperties).each(function(index) {
            if(index == stepProperties.length - 1){
                return;
            }else{
                var existingProp = '<div class="tapp-prop"><div class="prop-input" contenteditable="true" placeholder="transform:" spellcheck="false" onchange="updateTargetStyles();">' + stepProperties[index].split(":")[0] + ':</div><div class="prop-input" contenteditable="true" placeholder="rotate(180deg);" spellcheck="false" onchange="updateTargetStyles();">' + stepProperties[index].split(":")[1] + ';</div></div>'
                $("#tappPropertyList").append(existingProp);
            }
        });

        updateTargetStyles();
    }



    console.log(transitions);

    // Clear timeline before adding again
    $("#timelineBody").empty();

    $("#timelineBody").append("<div id='timelineTracker'></div>");
    $("#timelineBody").append("<div id='timelineMarker'><b></b></div>");

    $.each(transitions, function (key, val) {
        $("#timelineBody").append("<div class='timeline-step' id='timelineStep" + key + "' onclick='changeStep(" + key + ")' style='left: " + key + "%;'><label>" + key + "</label></div>");
    });


    currentStep = newStepPercent;

    // Set active class for current timeline step;
    $(".timeline-step").removeClass("active");
    $("#timelineStep" + newStepPercent).addClass("active");


    updatePageData();
}



// Delete Step
// Delete Step
// Delete Step
function deleteCurrentStep(){
    var stepToDelete = currentStep;

    changeStep(0);

    delete transitions[stepToDelete];

    changeStep(0);



    console.log(transitions);
}



// Click Timeline
// Click Timeline
// Click Timeline
var hoverNewStepPos = 0;
$("#timelineBody").mousemove(function(event){
    var elementMousePos = event.pageX - $('#timelineBody').offset().left + 5;
    var elementWidth = $("#timelineBody").width();

    var percentagePos = (elementMousePos / elementWidth * 100);

    var markerLeft = percentagePos.toString().substring(0, 4);

    $("#timelineMarker").css({'left': markerLeft + "%"});
    $("#timelineMarker b").text(markerLeft.split(".")[0] + "%");
    hoverNewStepPos = markerLeft.split(".")[0];
});

// Click timeline to add new step
// NOT on timeline step
$("#timelineBody").click(function(){
    changeStep(hoverNewStepPos);
});


// Show code editors
// Show code editors
// Show code editors
$("#editTargetCSS").click(function(){
    $(".tapp-top-nav, .tapp-sidebar, .tapp-timeline").addClass("modal-blur");
    $("#targetCSSCode").css('display','block');
    $("#hideEditors").css('display','flex');
});
$("#editStageCSS").click(function(){
    $(".tapp-top-nav, .tapp-sidebar, .tapp-timeline").addClass("modal-blur");
    $("#stageCSSCode").css('display','block');
    $("#hideEditors").css('display','flex');
});
$("#hideEditors").click(function(){
    $(".canvas-editor").css('display','none');
    $("#hideEditors").css('display','none');
    $(".tapp-top-nav, .tapp-sidebar, .tapp-timeline").removeClass("modal-blur");

});



// Show Output CSS
// Show Output CSS
// Show Output CSS
function showOutput(){

    $("#outputCSS").empty();

    // Tell people to follow me on Twitter
    $("#outputCSS").append("/* I hope this was helpful! */\n");
    $("#outputCSS").append("/* Follow me on Twitter 🐤 <a href='https://twitter.com/sleumasm' target='_blank'>@sleumasm</a> to see what I'm up to. */\n");
    $("#outputCSS").append("/* Also check out my other project I'm working on - <a href='https://ceev.io' target='_blank'>Ceev.io</a>. A pretty cool online resume creator 📃. */\n\n\n");


    $("#outputCSS").append("/* Your animation code is below! 👇👇👇 */\n");
    $("#outputCSS").append("___________________________________________\n\n\n");

    $("#outputCSS").append("@keyframes yourAnimation{\n");

    $.each(transitions, function (key, val) {
        $("#outputCSS").append("    " + key + "%{\n        " + val.replace(/;/g, '; \n        ') + "}\n");
    });
    $("#outputCSS").append("}\n\n")
    $("#outputCSS").append(".elementToAnimate{\n    animation: yourAnimation " + $("#animationProperties").text() + "\n}")

    $("#resultsModalLightbox").css('display','block');
    $("#resultsModal").css('display','block');


    // Actual Show Output
    $(".tapp-top-nav, .tapp-sidebar, .tapp-timeline").addClass("modal-blur");
    $("#outputCSS").css('display','block');
    $("#hideEditors").css('display','flex');


}

// Watch for changes on contenteditable
// Trigger style update
$('body').on('focus', '.prop-input', function() {
    var $this = $(this);
    $this.data('before', $this.html());
    return $this;
}).on('blur keyup paste input', '.prop-input', function() {
    var $this = $(this);
    if ($this.data('before') !== $this.html()) {
        $this.data('before', $this.html());
        updateTargetStyles();
        stopAnimation();
    }
    return $this;
}).on('blur', '.prop-name', function() { // Check property name for colon :
    var $this = $(this);
    var text = $this.text().replace(/\s/g, "").slice(-1);
    if (text != ':'){
        $(this).append(':');
        updateTargetStyles();
        stopAnimation();
    }
}).on('blur', '.prop-value', function() { // Check property value for ending semicolon ;
    var $this = $(this);
    var text = $this.text().replace(/\s/g, "").slice(-1);
    if (text != ';'){
        $(this).append(';');
        updateTargetStyles();
        stopAnimation();
    }
}).on('blur keyup paste input', '#targetCSSCode', function() { // Update target CSS on change
    var $this = $(this);
    if ($this.data('before') !== $this.html()) {
        $this.data('before', $this.html());
        appendNewTargetStyles();
        stopAnimation();
    }
    return $this;
}).on('blur keyup paste input', '#stageCSSCode', function() { // Update target CSS on change
    var $this = $(this);
    if ($this.data('before') !== $this.html()) {
        $this.data('before', $this.html());
        appendNewStageStyles();
        stopAnimation();
    }
    return $this;
});;
