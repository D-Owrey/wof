var locked = false; //Spam prevention lock
var scrolling = false;

//UI Constants
var map_scroll_speed = 50;
var ui_scroll_speed = 55;
var battle_map_border_size = 75;

$(function() {

/*=============================
= Party and Ability Container =
= functions                   =
=============================*/

    $("#upCharacterPan").mousedown(function() {
        scrolling = true;
        pan_ui_object($(this), $("#characterContainer"), "up"); });

    $("#downCharacterPan").mousedown(function() { 
        scrolling = true;
        pan_ui_object($(this), $("#characterContainer"), "down"); });

    $("#leftAbilityPan").mousedown(function() { 
        scrolling = true;
        pan_ui_object($(this), $("#abilityContainer"), "left"); });

    $("#rightAbilityPan").mousedown(function() { 
        scrolling = true;
        pan_ui_object($(this), $("#abilityContainer"), "right"); });

/*============================
= Viewport control functions =
============================*/

    $("#upViewportPan").mousedown(function() { 
        scrolling = true;
        pan_ui_object($(this), $("#battleMap"), "up"); });

    $("#rightViewportPan").mousedown(function() { 
        scrolling = true;
        pan_ui_object($(this), $("#battleMap"), "right"); });

    $("#downViewportPan").mousedown(function() { 
        scrolling = true;
        pan_ui_object($(this), $("#battleMap"), "down"); });

    $("#leftViewportPan").mousedown(function() { 
        scrolling = true;
        pan_ui_object($(this), $("#battleMap"), "left"); });

    $(".viewportPanTile, .abilityPanTile, .characterPanTile").mouseup(
        function() { halt_ui_animation($(this)) });

    $(window).resize(function() {
        recenter_battle_map(); });
});

function recenter_battle_map() { //FIXME

    if($("#viewportWindow").width() == viewport_window_x_size
        || $("#viewportWindow").height() == viewport_window_y_size)
        return;

    var map_newX = ($("#viewportWindow").width() - viewport_window_x_size);
    var map_newY = ($("#viewportWindow").height() - viewport_window_y_size);

    $("#battleMap").animate({ left: "+=" + map_newX,
                              top:  "+=" + map_newY
                            }, "fast");

    viewport_window_x_size = $("#viewportWindow").width();
    viewport_window_y_size = $("#viewportWindow").height();
}

function halt_ui_animation(controlElement) {

    $(controlElement).removeAttr("style");
    scrolling = false;

    if($(this).attr("class") == "viewportPanTile")
        $("#battleMap").stop();
    else if ($(controlElement).attr("class") == "abilityPanTile")
        $("#abilityContainer").stop();
    else
        $("#characterContainer").stop(); 
}

function pan_ui_object(controlElement, affectedElement, direction ) {
    if(!scrolling) { affectedElement.stop(); }
    
    else {

        //Placeholder buttonpress indicator
        $(controlElement).css("background-color", "white");

        var object_scroll_speed = 
            ($(affectedElement).attr("id") == "battleMap") 
                ? map_scroll_speed : ui_scroll_speed;

        if(direction == "up")
            animateObject = { top:  "+=" + object_scroll_speed };
        else if(direction == "right")
            animateObject = { left: "-=" + object_scroll_speed };
        else if(direction == "down")
            animateObject = { top:  "-=" + object_scroll_speed };
        else
            animateObject = { left: "+=" + object_scroll_speed };
/*
        if($("#battleMap").css("left") < 75 + object_scroll_speed)
            animateObject = { left: "75" };
        else if ($("#battleMap").css("top") < 75 + object_scroll_speed)
            animateObject = { top: "75" };
*/
        affectedElement.animate(animateObject,
            "fast", function(){ 
                        if (scrolling)
                            pan_ui_object(
                                controlElement, affectedElement, direction);});
   }
}

function toggle_cinematic_screen() {
    if(locked) { return; }

    locked = true;

    $("#viewportWindow").animate(
        { width: "98%",
          height: "80%",
          margin: "10px",
          backgroundColor: "darkred" },
        "slow", function() { locked = false; });
}

