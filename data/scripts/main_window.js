var locked = false; //Spam prevention lock

$(function() {

    $("#viewportWindow").click(function() {
        toggle_cinematic_screen(); });

    $("#topCharacterPan").click(function() { 
        slide_character_container("up"); });

    $("#bottomCharacterPan").click(function() { 
        slide_character_container("down"); });

    $("#leftAbilityPan").click(function() {
        slide_ability_container("left"); });

    $("#rightAbilityPan").click(function() {
        slide_ability_container("right"); });
});

function slide_character_container( direction ) {
    if(locked == true) { return; }

    locked = true;
    var pan_amount;

    pan_amount = (direction == "up") ? "+=55" : "-=55";

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
