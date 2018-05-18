// Inject.js


// Wait for target element before executing actual functions
var waitForTarget = function(){
    if(targetElementSelected){
        runKeyframes();
    }else{
        setTimeout(function(){
            waitForTarget();
        }, 100);
    }
}

waitForTarget();

var runKeyframes = function(){

    // Set up variables
    var currentStep = 0;
    // Variable containing all steps
    var transitions = {};
    // Set initial step to 0
    changeStep('0');

    // Add new CSS Property to list
    var propString = '<div class="kf-prop"><div class="prop-input" contenteditable="true" placeholder="transform:" spellcheck="false" onchange="updateTargetStyles();"></div><div class="prop-input" contenteditable="true" placeholder="rotate(180deg);" spellcheck="false" onchange="updateTargetStyles();"></div></div>'
    $("#kfNewProperty").click(function(){
        // Stop animation
        stopAnimation();
        // Add new blank property
        $("#kfPropertyList").append(propString);
    });


    // Update data on page
    function updatePageData(){
        // Update current step number
        $(".kf-current-step").each(function(index) {
            $(this).text(currentStep);
        });
    }


    // Live update CSS on target element
    var targetStyles = "";
    function updateTargetStyles(){
        targetStyles = "";
        $("#kfPropertyList .kf-prop").each(function(index) {
            targetStyles = targetStyles + $(this).text().replace(/\s/g, "");
        });
        $(keyframeTargetElement).attr("style", targetStyles);
    }

    // Append styles to page
    function appendStyles(){
        $("#kfStyleContainer").empty();

        $("#kfStyleContainer").append("@keyframes yourAnimation{");

        $.each(transitions, function (key, val) {
            $("#kfStyleContainer").append(key + "%{" + val + "}");
        });
        $("#kfStyleContainer").append("}\n")
        $("#kfStyleContainer").append(".elementToAnimate{ animation: yourAnimation " + $("#animationProperties").text() + "}")
        $("#kfStyleContainer").append(".animate-timeline-tracker{ animation: trackerAnimation " + $("#animationProperties").text() + "}")
    }


    function startAnimation(){
        $("#kfStartAnimationButton").css('display','none');
        $("#kfStopAnimationButton").css('display','flex');
        changeStep(currentStep);
        appendStyles();
        $(keyframeTargetElement).addClass("elementToAnimate");
        $("#timelineTracker").addClass("animate-timeline-tracker");
    }
    function stopAnimation(){
        $("#kfStopAnimationButton").css('display','none');
        $("#kfStartAnimationButton").css('display','flex');
        $(keyframeTargetElement).removeClass("elementToAnimate");
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
            $("#kfPropertyList").empty();
            $(stepProperties).each(function(index) {
                if(index == stepProperties.length - 1){
                    return;
                }else{
                    var existingProp = '<div class="kf-prop"><div class="prop-input" contenteditable="true" placeholder="transform:" spellcheck="false" onchange="updateTargetStyles();">' + stepProperties[index].split(":")[0] + ':</div><div class="prop-input" contenteditable="true" placeholder="rotate(180deg);" spellcheck="false" onchange="updateTargetStyles();">' + stepProperties[index].split(":")[1] + ';</div></div>'
                    $("#kfPropertyList").append(existingProp);
                }
            });

            updateTargetStyles();
        }

        // Clear timeline before adding again
        $("#kfTimelineBody").empty();
        $("#kfTimelineBody").append("<div id='timelineTracker'></div>");
        $("#kfTimelineBody").append("<div id='timelineMarker'><b></b></div>");

        $.each(transitions, function (key, val) {
            $("#kfTimelineBody").append("<div class='timeline-step' id='timelineStep" + key + "' onclick='changeStep(" + key + ")' style='left: " + key + "%;'><label>" + key + "</label></div>");
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
    $("#deleteKeyframePos").click(function(){
        var stepToDelete = currentStep;
        changeStep(0);
        delete transitions[stepToDelete];
        changeStep(0);
    });



    // Click Timeline
    // Click Timeline
    // Click Timeline
    var hoverNewStepPos = 0;
    $("#kfTimelineBody").mousemove(function(event){
        var elementMousePos = event.pageX - $('#kfTimelineBody').offset().left + 5;
        var elementWidth = $("#kfTimelineBody").width();

        var percentagePos = (elementMousePos / elementWidth * 100);

        var markerLeft = percentagePos.toString().substring(0, 4);

        $("#timelineMarker").css({'left': markerLeft + "%"});
        $("#timelineMarker b").text(markerLeft.split(".")[0] + "%");
        hoverNewStepPos = markerLeft.split(".")[0];
    });

    // Click timeline to add new step
    // NOT on timeline step
    $("#kfTimelineBody").click(function(){
        changeStep(hoverNewStepPos);
    });



    // Show Output CSS
    // Show Output CSS
    // Show Output CSS
    $("#showOutputButton").click(function(){

        $("#kfOutput").empty();
        // Message
        $("#kfOutput").append("/* Your animation code is below! 👇👇👇 */\n");
        $("#kfOutput").append("___________________________________________\n\n\n");

        $("#kfOutput").append("@keyframes yourAnimation{\n");

        $.each(transitions, function (key, val) {
            if(val){
                $("#kfOutput").append("    " + key + "%{\n        " + val.replace(/;/g, '; \n        ') + "}\n");
            }
        });
        $("#kfOutput").append("}\n\n")
        $("#kfOutput").append(".elementToAnimate{\n    animation: yourAnimation " + $("#animationProperties").text() + "\n}")

        // Actual Show Output
        $("#kfOutput").css('display','block');
        $("#kfCodeLightbox").css('display','block');
        $(".kf-code-window").css('display','flex');
    })


    // Close Lightbox and Editor
    $("#kfCodeLightbox, #closeKfCodeWindow").click(function(){
        $("#kfCodeLightbox").css('display','none');
        $(".kf-code-window").css('display','none');
        // Hide Output code
        $("#kfOutput").css('display','none');
    });


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
    });;


    // Convert a bunch of onclicks to scripts
    $("#animationProperties").click(function(){
        stopAnimation();
    })
    $("#deleteCurrentStep").click(function(){
        deleteCurrentStep();
    })
    $("#kfStartAnimationButton").click(function(){
        startAnimation();
    });
    $("#kfStopAnimationButton").click(function(){
        stopAnimation();
    });


    // Terminate App
    $("#closeKeyframes").click(function(){
        $(".kf-sidebar, .kf-timeline, #kfCodeLightbox, .kf-code-window, #kfToast").remove();
        stopAnimation();
        $("#styleContainer").empty();
        $(keyframeTargetElement).attr("style", "");
    });


}


    // Dont forget to remove everything on close.
