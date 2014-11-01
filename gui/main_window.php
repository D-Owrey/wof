<div id = "masterContainer">

    <!-- Primary Viewport for maps, dialogue, etc -->
    <div id = "viewportWindow">
    </div>

    <!-- Party List -->
    <div id = "partyWindow">

        <div class = "characterPanTile" id = "topCharacterPan">
        </div>
    
        <?PHP
            for($i = 0; $i < 20; $i++) {
        ?>
                <div class = "characterTile">
                    <div class = "characterImage">
                    </div>

                    <div class = "characterTileRight">
                        <div class = "characterName">
                            <?= $i ?>
                        </div>
                        <div class = "characterStats"></div>
                    </div>

                </div>
        <?PHP
            }
        ?>

        <div class = "characterPanTile" id = "bottomCharacterPan">
        </div>

    </div>

    <!-- List of abilities for selected character -->
    <div id = "abilityWindow">

        <div class = "abilityPanTile" id = "leftAbilityPan">
        </div>

        <?PHP
            for($i = 0; $i < 20; $i++) {
        ?>

                <div class = "abilityTile">
                    <div class = "abilityImage">
                    </div>

                    <div class = "abilityName">
                        <?= $i ?>
                    </div>

                    <div class = "abilityStats"></div>

                </div>
        <?PHP
            }
        ?>

        <div class = "abilityPanTile" id = "rightAbilityPan">
        </div>
    </div>

</div> <!-- End masterContainer -->

