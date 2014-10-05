//WOF Engine

$(document).ready(function() {

    show_main_menu();
});


function detect_saved_game() {
//Probe local machine for save data
}


function new_game() {}


function recover_game_state() {
//Recover game state from cookie
}


function save_game_state() {
//Save game state to cookie
}


function show_main_menu() {
    toggle_menu_curtain('lower');

    //Create menu
        //Probe for Save
        //Enable ArrowKey/MousePointer selection
            //Act on selection
    toggle_menu_curtain('raise');
}


function toggle_menu_curtain(action) {
//Raise or drop menu curtain to restrict UI
//activity.

    if(action == 'lower') {
        //Display semi-transparent curtain; Position over
        //main UI
    }

    else if (action == 'raise') {
        //Remove curtain from view; Release UI controls
    }
}





