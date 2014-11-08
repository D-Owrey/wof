var locked = false; //Spam prevention lock
var partyContainerPosition = 0;
var abilityContainerPosition = 0;

$(function() {

    $("#upCharacterPan").click(function() { 
        slide_character_container("up"); });

    $("#downCharacterPan").click(function() { 
        slide_character_container("down"); });

    $("#leftAbilityPan").click(function() {
        slide_ability_container("left"); });

    $("#rightAbilityPan").click(function() {
        slide_ability_container("right"); });


    $("#upViewportPan").mouseDown(function() {
        pan_battle_map("up"); });

    $("#rightViewportPan").mouseDown(function() {
        pan_battle_map("right"); });

    $("#downViewportPan").mouseDown(function() {
        pan_battle_map("down"); });

    $("#leftViewportPan").mouseDown(function() {
        pan_battle_map("left"); });

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
    if(locked == true) { return; }

    locked = true;
    var pan_amount;

    pan_amount = (direction == "left") ? "+=93" : "-=93";

    $("#abilityContainer").animate(
        { left: pan_amount }, "slow", function() { locked = false; });
}


function toggle_cinematic_screen() {
    if(locked == true) { return; }

    locked = true;

    $("#viewportWindow").animate(
        { width: "98%",
          height: "80%",
          margin: "10px",
          backgroundColor: "darkred" },
        "slow", function() { locked = false; });
}


function pan_battle_map( direction ) {
    return;
}
