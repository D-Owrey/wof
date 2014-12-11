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

    //Adjust map position when viewport window is resized
    $(window).resize(function() {
        center_map_to_coords(Math.round(battle_map_max_x/2), 
                Math.round(battle_map_max_y/2), MAP_FAST_PAN_SPEED); });
});

function center_map_to_coords(x_coord, y_coord, pan_speed) {
//Currently pans map so the upper-left corner is the tile at the specified
//coordinates. Coords need to refer to the center of the map.

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
/*
        if($("#battleMap").css("left") < 75 + object_scroll_speed)
            animateObject = { left: "75" };
        else if ($("#battleMap").css("top") < 75 + object_scroll_speed)
            animateObject = { top: "75" };
*/
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
