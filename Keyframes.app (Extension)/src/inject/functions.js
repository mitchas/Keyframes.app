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

        $(keyframeTargetElement).attr("style", targetStyles);
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
        $(keyframeTargetElement).addClass("elementToAnimate");
        $("#timelineTracker").addClass("animate-timeline-tracker");
    }
    function stopAnimation(){
        $("#stopAnimationButton").css('display','none');
        $("#startAnimationButton").css('display','flex');
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



    // Show Output CSS
    // Show Output CSS
    // Show Output CSS
    function showOutput(){

        changeStep(currentStep);
        

        $("#tappOutput").empty();

        // Tell people to follow me on Twitter
        $("#tappOutput").append("/* I hope this was helpful! */\n");
        $("#tappOutput").append("/* Follow me on Twitter 🐤 <a href='https://twitter.com/sleumasm' target='_blank'>@sleumasm</a> to see what I'm up to. */\n");
        $("#tappOutput").append("/* Also check out my other project I'm working on - <a href='https://ceev.io' target='_blank'>Ceev.io</a>. A pretty cool online resume creator 📃. */\n\n\n");


        $("#tappOutput").append("/* Your animation code is below! 👇👇👇 */\n");
        $("#tappOutput").append("___________________________________________\n\n\n");

        $("#tappOutput").append("@keyframes yourAnimation{\n");

        $.each(transitions, function (key, val) {
            if(val){
                $("#tappOutput").append("    " + key + "%{\n        " + val.replace(/;/g, '; \n        ') + "}\n");
            }
        });
        $("#tappOutput").append("}\n\n")
        $("#tappOutput").append(".elementToAnimate{\n    animation: yourAnimation " + $("#animationProperties").text() + "\n}")


        // Actual Show Output
        $("#tappOutput").css('display','block');
        $("#tappHideOutput").css('display','block');
    }
    $("#tappHideOutput").click(function(){
        $("#tappOutput").css('display','none');
        $("#tappHideOutput").css('display','none');
    })

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
    $("#startAnimationButton").click(function(){
        startAnimation();
    });
    $("#stopAnimationButton").click(function(){
        stopAnimation();
    });
    $("#showOutputButton").click(function(){
        showOutput();
    })


    // Terminate App
    $("#closeKeyframes").click(function(){
        $(".tapp-sidebar, .tapp-timeline").remove();
        stopAnimation();
        $("#styleContainer").empty();
        $(keyframeTargetElement).attr("style", "");
    });


}


    // Dont forget to remove everything on close.
