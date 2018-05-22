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
    var stepStyles = {};
    var stepValues = {};
    // Set initial step to 0
    changeStep('0');


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

        // Transform props
        var transformStyles = "";
        if(!$("#presetRotate").val() && !$("#presetScale").val() && !$("#presetTransX").val() && !$("#presetTransY").val() && !$("#presetSkewX").val() && !$("#presetSkewY").val()){
            console.log("No transform props;")
        }else{
            transformStyles = "transform:";
            if($("#presetRotate").val()){transformStyles += " rotate(" + $("#presetRotate").val() + ")";}
            if($("#presetScale").val()){transformStyles += " scale(" + $("#presetScale").val() + ")";}
            if($("#presetTransX").val()){transformStyles += " translateX(" + $("#presetTransX").val() + ")";}
            if($("#presetTransY").val()){transformStyles += " translateY(" + $("#presetTransY").val() + ")";}
            if($("#presetSkewX").val()){transformStyles += " skewX(" + $("#presetSkewX").val() + ")";}
            if($("#presetSkewY").val()){transformStyles += " skewY(" + $("#presetSkewY").val() + ")";}

            transformStyles += ";";
            targetStyles += transformStyles;
        }

        // Colors & Fonts
        if($("#presetTransOrigin").val()){
            targetStyles += "transform-origin: " + $("#presetTransOrigin").val() + ";";
        }
        // Colors & Fonts
        if($("#presetBG").val()){
            targetStyles += "background: " + $("#presetBG").val() + ";";
        }
        if($("#presetOpacity").val()){
            targetStyles += "opacity: " + $("#presetOpacity").val() + ";";
        }
        if($("#presetColor").val()){
            targetStyles += "color: " + $("#presetColor").val() + ";";
        }
        if($("#presetFontSize").val()){
            targetStyles += "font-size: " + $("#presetFontSize").val() + ";";
        }
        if($("#presetFontWeight").val()){
            targetStyles += "font-weight: " + $("#presetFontWeight").val() + ";";
        }

        // Size & Spacing
        if($("#presetWidth").val()){
            targetStyles += "width: " + $("#presetWidth").val() + ";";
        }
        if($("#presetHeight").val()){
            targetStyles += "height: " + $("#presetHeight").val() + ";";
        }
        if($("#presetMargin").val()){
            targetStyles += "margin: " + $("#presetMargin").val() + ";";
        }
        if($("#presetPadding").val()){
            targetStyles += "padding: " + $("#presetPadding").val() + ";";
        }

        // Border / shadow
        if($("#presetBorder").val()){
            targetStyles += "border: " + $("#presetBorder").val() + ";";
        }
        if($("#presetShadow").val()){
            targetStyles += "box-shadow: " + $("#presetShadow").val() + ";";
        }
        if($("#presetOutline").val()){
            targetStyles += "outline: " + $("#presetOutline").val() + ";";
        }

        $(keyframeTargetElement).attr("style", "");
        $(keyframeTargetElement).attr("style", targetStyles);
    }

    // Append styles to page
    var animationProperties = "";
    function appendStyles(){
        // Prepare animation properties
        animationProperties = "";
        if(!$("#animationDuration").val()){$("#animationDuration").val("3s")}
        if(!$("#animationIterations").val()){$("#animationIterations").val("infinite")}
        if(!$("#animationDelay").val()){$("#animationDelay").val("0s")}
        // 3s infinite ease-in-out
        animationProperties += $("#animationDuration").val() + " ";
        animationProperties += $("#animationIterations").val() + " ";
        animationProperties += $("#animationDelay").val() + " ";
        animationProperties += $("#animationTiming").val() + ";";


        $("#kfStyleContainer").empty();

        $("#kfStyleContainer").append("@keyframes yourAnimation{");

        $.each(stepStyles, function (key, val) {
            $("#kfStyleContainer").append(key + "%{" + val + "}");
        });
        $("#kfStyleContainer").append("}\n")
        $("#kfStyleContainer").append(".elementToAnimate{ animation: yourAnimation " + animationProperties + "}")
        $("#kfStyleContainer").append(".animate-timeline-tracker{ animation: trackerAnimation " + animationProperties + "}")
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
        stepStyles[prevStep] = targetStyles;
        stepValues[prevStep] = [
            $("#presetRotate").val(),
            $("#presetScale").val(),
            $("#presetTransX").val(),
            $("#presetTransY").val(),
            $("#presetSkewX").val(),
            $("#presetSkewY").val(),
            $("#presetTransOrigin").val(),
            $("#presetBG").val(),
            $("#presetOpacity").val(),
            $("#presetColor").val(),
            $("#presetFontSize").val(),
            $("#presetFontWeight").val(),
            $("#presetWidth").val(),
            $("#presetHeight").val(),
            $("#presetMargin").val(),
            $("#presetPadding").val(),
            $("#presetBorder").val(),
            $("#presetShadow").val(),
            $("#presetOutline").val()
        ];


        if(!stepStyles[newStepPercent]){
            stepStyles[newStepPercent] = targetStyles;
            stepValues[prevStep] = [
                $("#presetRotate").val(),
                $("#presetScale").val(),
                $("#presetTransX").val(),
                $("#presetTransY").val(),
                $("#presetSkewX").val(),
                $("#presetSkewY").val(),
                $("#presetTransOrigin").val(),
                $("#presetBG").val(),
                $("#presetOpacity").val(),
                $("#presetColor").val(),
                $("#presetFontSize").val(),
                $("#presetFontWeight").val(),
                $("#presetWidth").val(),
                $("#presetHeight").val(),
                $("#presetMargin").val(),
                $("#presetPadding").val(),
                $("#presetBorder").val(),
                $("#presetShadow").val(),
                $("#presetOutline").val()
            ];
        }else{
            // Set target element styles form existing step
            targetStyles = stepStyles[newStepPercent];

            // Set input vals
            $("#presetRotate").val(stepValues[newStepPercent][0] || "xx"),
            $("#presetScale").val(stepValues[newStepPercent][1]),
            $("#presetTransX").val(stepValues[newStepPercent][2]),
            $("#presetTransY").val(stepValues[newStepPercent][3]),
            $("#presetSkewX").val(stepValues[newStepPercent][4]),
            $("#presetSkewY").val(stepValues[newStepPercent][5]),
            $("#presetTransOrigin").val(stepValues[newStepPercent][6]),
            $("#presetBG").val(stepValues[newStepPercent][7]),
            $("#presetOpacity").val(stepValues[newStepPercent][8]),
            $("#presetColor").val(stepValues[newStepPercent][9]),
            $("#presetFontSize").val(stepValues[newStepPercent][10]),
            $("#presetFontWeight").val(stepValues[newStepPercent][11]),
            $("#presetWidth").val(stepValues[newStepPercent][12]),
            $("#presetHeight").val(stepValues[newStepPercent][13]),
            $("#presetMargin").val(stepValues[newStepPercent][14]),
            $("#presetPadding").val(stepValues[newStepPercent][15]),
            $("#presetBorder").val(stepValues[newStepPercent][16]),
            $("#presetShadow").val(stepValues[newStepPercent][17]),
            $("#presetOutline").val(stepValues[newStepPercent][18])

            updateTargetStyles();
        }

        // Clear timeline before adding again
        $("#kfTimelineBody").empty();
        $("#kfTimelineBody").append("<div id='timelineTracker'></div>");
        $("#kfTimelineBody").append("<div id='timelineMarker'><b></b></div>");

        $.each(stepStyles, function (key, val) {
            $("#kfTimelineBody").append("<div class='timeline-step' id='timelineStep" + key + "' data-step='" + key + "' style='left: " + key + "%;'><label>" + key + "</label></div>");
        });

        currentStep = newStepPercent;
        // Set active class for current timeline step;
        $(".timeline-step").removeClass("active");
        $("#timelineStep" + newStepPercent).addClass("active");

        updatePageData();
    }

    // Click timeline step, go to that step
    $(".timeline-step").click(function(){
        changeStep($(this).getAttribute('data-step'));
    });



    // Delete Step
    // Delete Step
    // Delete Step
    $("#deleteKeyframePos").click(function(){
        var stepToDelete = currentStep;
        changeStep(0);
        delete stepStyles[stepToDelete];
        delete stepValues[stepToDelete];
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

        changeStep(currentStep);
        appendStyles();

        $("#kfOutput").empty();
        // Tell people to follow me on Twitter
        $("#kfOutput").append("/* I hope this was helpful! */\n");
        $("#kfOutput").append("/* Follow me on Twitter 🐤 <a href='https://twitter.com/sleumasm' target='_blank'>@sleumasm</a> to see what I'm up to. */\n");
        $("#kfOutput").append("/* Also check out my other project I'm working on - <a href='https://ceev.io' target='_blank'>Ceev.io</a>. A pretty cool online resume creator 📃. */\n\n\n");

        $("#kfOutput").append("/* Your animation code is below! 👇👇👇 */\n");
        $("#kfOutput").append("___________________________________________\n\n\n");

        $("#kfOutput").append("@keyframes yourAnimation{\n");

        $.each(stepStyles, function (key, val) {
            $("#kfOutput").append("    " + key + "%{\n        " + val.replace(/\;/g, ';\n        '));
            $("#kfOutput").append("}\n");
        });
        $("#kfOutput").append("}\n\n")
        $("#kfOutput").append(".elementToAnimate{\n    animation: yourAnimation " + animationProperties + "\n}")

        // Actual Show Output
        $("#kfOutput").css('display','block');
        $("#kfCodeLightbox").css('display','block');
        $(".kf-code-window").css('display','flex');
    })

    // Toggle wells on sidebar
    $(".kf-presets-header").click(function(){
        $(this).next('.kf-preset-well').slideToggle(100);
        $(this).toggleClass('kf-well-active');
    });


    // Close Lightbox and Editor
    $("#kfCodeLightbox, #closeKfCodeWindow").click(function(){
        $("#kfCodeLightbox").css('display','none');
        $(".kf-code-window").css('display','none');
        // Hide Output code
        $("#kfOutput").css('display','none');
    });


    $('.kf-po-input').keyup(function(event){
        updateTargetStyles();
        stopAnimation();
    });
    // Stop animation if changing animation props
    $('#animationTiming, #animationDelay, #animationIterations, #animationDuration').focus(function(event){
        stopAnimation();
    });

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
