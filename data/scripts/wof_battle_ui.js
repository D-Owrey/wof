var locked = false; //Spam prevention lock
var scrolling = false;

//UI Constants
var MAP_SCROLL_SPEED = 75;
var BUTTON_SCROLL_SPEED = 55;
var BATTLE_MAP_TILE_SIZE = 75;
var MAP_FAST_PAN_SPEED = 200;
var MAP_SLOW_PAN_SPEED = 600;

//Temporary Map Constant
var battle_map_max_x = 15;
var battle_map_max_y = 10;

$(function() {

    $(".viewportPanTile, .abilityPanTile, .characterPanTile").mouseup(
        function() { 
            $(this).removeAttr("style");
            halt_ui_animation($(this)) });

    $(".viewportPanTile, .abilityPanTile, .characterPanTile").mouseleave(
        function() { 
            $(this).removeAttr("style");
            halt_ui_animation($(this)) });

/*=============================
= Party and Ability Container =
= functions                   =
=============================*/

    $("#upCharacterPan").mousedown(function() {
        scrolling = true;
        $(this).css("background-color", "white");
        pan_ui_object($("#characterContainer"), "up"); });

    $("#downCharacterPan").mousedown(function() { 
        scrolling = true;
        $(this).css("background-color", "white");
        pan_ui_object($("#characterContainer"), "down"); });

    $("#leftAbilityPan").mousedown(function() { 
        scrolling = true;
        $(this).css("background-color", "white");
        pan_ui_object($("#abilityContainer"), "left"); });

    $("#rightAbilityPan").mousedown(function() { 
        scrolling = true;
        $(this).css("background-color", "white");
        pan_ui_object($("#abilityContainer"), "right"); });

/*============================
= Viewport control functions =
============================*/

    //Mouse Controls
    $("#upViewportPan").mousedown(function() { 
        scrolling = true;
        $(this).css("background-color", "white");
        pan_ui_object($("#battleMap"), "up"); });

    $("#rightViewportPan").mousedown(function() { 
        scrolling = true;
        $(this).css("background-color", "white");
        pan_ui_object($("#battleMap"), "right"); });

    $("#downViewportPan").mousedown(function() { 
        scrolling = true;
        $(this).css("background-color", "white");
        pan_ui_object($("#battleMap"), "down"); });

    $("#leftViewportPan").mousedown(function() { 
        scrolling = true;
        $(this).css("background-color", "white");
        pan_ui_object($("#battleMap"), "left"); });

    $(".viewportPanTile, .abilityPanTile, .characterPanTile").mouseup(
        function() { halt_ui_animation( $(this) ) });

    //Keyboard Controls
    $(document).keydown( function(e) {
        handle_arrow_keypress(e); });

    $(document).keyup( function() {
        $("#battleMap").clearQueue();
        halt_ui_animation( $(".viewportPanTile") ); });

    //Adjust map position when viewport window is resized
    $(window).resize(function() {
        center_map_to_coords(Math.round(battle_map_max_x/2), 
                Math.round(battle_map_max_y/2), MAP_FAST_PAN_SPEED); });
});

function handle_arrow_keypress(e) {
    switch(e.which) {
        case 37: //left
            scrolling = true;
            pan_ui_object($("#battleMap"), "left");
            break;

        case 38: //up
            scrolling = true;
            pan_ui_object($("#battleMap"), "up");
            break;

        case 39: //right
            scrolling = true;
            pan_ui_object($("#battleMap"), "right");
            break;

        case 40: //down
            scrolling = true;
            pan_ui_object($("#battleMap"), "down");
            break;

        default: return; //other keys
    }

    e.preventDefault();
}

function recenter_battle_map() { //FIXME

/*
    if($("#viewportWindow").width() == viewport_window_x_size
        || $("#viewportWindow").height() == viewport_window_y_size)
        return;
*/

    var viewportWindow_width = $("#viewportWindow").width();
    var viewportWindow_height = $("#viewportWindow").height();

    $("#battleMap").animate({ left: "-" + (x_coord*BATTLE_MAP_TILE_SIZE
                                        - viewportWindow_width/2),
                              top: "-" + (y_coord*BATTLE_MAP_TILE_SIZE
                                       - viewportWindow_height/2)
                            }, pan_speed);
}

function halt_ui_animation(controlElement) {

    scrolling = false;

    if($(this).attr("class") == "viewportPanTile")
        $("#battleMap").stop();
    else if ($(controlElement).attr("class") == "abilityPanTile")
        $("#abilityContainer").stop();
    else
        $("#characterContainer").stop(); 
}

function pan_ui_object(affectedElement, direction ) { //FIXME
/* 
   Pans UI object affectedElement in a string direction (e.g. "up"). 
   Returns nothing.
*/

    if(!scrolling) { affectedElement.stop(); }
    
    else {

        /*  Needs scrolling bounds
              -No more than half the battle map's width or height
              -No further than the edge object in any list

            Bounds:
                Left:   viewportWidth/2
                Right:  battlemapWidth - (viewportWidth/2)
                Up:     viewportHeight/2
                Down:   battlemapHeight - (viewportHeight/2)
        */


        //Placeholder buttonpress indicator

        var object_scroll_speed = 
            ($(affectedElement).attr("id") == "battleMap") 
                ? MAP_SCROLL_SPEED : BUTTON_SCROLL_SPEED;

        if(direction == "up")
            animateObject = { top:  "+=" + object_scroll_speed };
        else if(direction == "right")
            animateObject = { left: "-=" + object_scroll_speed };
        else if(direction == "down")
            animateObject = { top:  "-=" + object_scroll_speed };
        else
            animateObject = { left: "+=" + object_scroll_speed };

        affectedElement.animate(animateObject,
            "fast", function(){ 
                        if (scrolling)
                            pan_ui_object( affectedElement, direction);});
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
