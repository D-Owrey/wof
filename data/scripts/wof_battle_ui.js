var locked = false; //Spam prevention lock
var scrolling = false;

var map_scroll_speed = "50";

var partyContainerPosition = 0;
var abilityContainerPosition = 0;

$(function() {
/*=============================
= Party and Ability Container =
= functions                   =
=============================*/

    $("#upCharacterPan").click(function() { 
        slide_character_container("up"); });

    $("#downCharacterPan").click(function() { 
        slide_character_container("down"); });

    $("#leftAbilityPan").click(function() {
        slide_ability_container("left"); });

    $("#rightAbilityPan").click(function() {
        slide_ability_container("right"); });

/*============================
= Viewport control functions =
============================*/

    $("#upViewportPan").mousedown(function() {
        scrolling = true;
        pan_battle_map($(this), "up"); });

    $("#rightViewportPan").mousedown(function() {
        scrolling = true;
        pan_battle_map($(this), "right"); });

    $("#downViewportPan").mousedown(function() {
        scrolling = true;
        pan_battle_map($(this), "down"); });

    $("#leftViewportPan").mousedown(function() {
        scrolling = true;
        pan_battle_map($(this), "left"); });

    $(".viewportPanTile").mouseup(function() {
        $(".viewportPanTile").css("background-color", "yellow");
        $("#battleMap").stop(); });

    $("#viewportWindow").resize(function() {
        return; }); //FIXME
});


function slide_character_container( direction ) {
    if(locked == true) { return; }

    locked = true;
    var pan_amount;

    if(direction == "up") {
        if(partyContainerPosition == 0) {
            locked = false;
            return;
        }

        else {
            pan_amount = "+=55";
            partyContainerPosition--;
        }
    }

    else if(partyContainerPosition == 
        $(".characterTile").length - 7) {
            locked = false;
            return;
    }

    else {
        pan_amount = "-=55";
        partyContainerPosition++;
    }

    $("#characterContainer").animate(
        { top: pan_amount }, "slow", function() { locked = false; });
}


function slide_ability_container( direction ) {
    if(locked) { return; }

    locked = true;
    var pan_amount;

    pan_amount = (direction == "left") ? "+=93" : "-=93";

    $("#abilityContainer").animate(
        { left: pan_amount }, "slow", function() { locked = false; });
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


function pan_battle_map(tileElement, direction ) {
    if(!scrolling) { $("#battleMap").stop(); }
    
    else {

        $(tileElement).css("background-color", "white");

        if(direction == "up")
            animateObject = { top: "+=" + map_scroll_speed };
        else if(direction == "right")
            animateObject = { left: "-=" + map_scroll_speed };
        else if(direction == "down")
            animateObject = { top: "-=" + map_scroll_speed };
        else
            animateObject = { left: "+=" + map_scroll_speed };

        $("#battleMap").animate(animateObject,
            "fast", function(){ 
                        if (scrolling)
                            pan_battle_map(tileElement, direction);});
   }
}

