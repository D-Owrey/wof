<div id = "masterContainer">

    <!-- Primary Viewport for maps, dialogue, etc -->
    <div id = "viewportWindow">
        <div class = "viewportPanTile" id = "upViewportPan"   ></div>
        <div class = "viewportPanTile" id = "rightViewportPan"></div>
        <div class = "viewportPanTile" id = "downViewportPan" ></div>
        <div class = "viewportPanTile" id = "leftViewportPan" ></div>

        <div id = "battleMap">
            <?PHP
                for($i = 0; $i < 150; $i++) {
            ?>
                <div class = "battleMapTestTile">
                    <?= $i ?>
                </div>
            <?PHP
                }
            ?>

        </div>
    </div>

    <!-- Party List -->
    <div id = "partyWindow">

        <div class = "characterPanTile" id = "upCharacterPan"></div>
        <div class = "tileContainer" id = "characterContainer" > 
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
        </div> <!-- End tileContainer -->

        <div class = "characterPanTile" id = "downCharacterPan"></div>

    </div>

    <!-- List of abilities for selected character -->
    <div id = "abilityWindow">

        <div class = "abilityPanTile" id = "leftAbilityPan">
        </div>
        
        <div class = "tileContainer" id = "abilityContainer">
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
        </div> <!-- End tileContainer -->

        <div class = "abilityPanTile" id = "rightAbilityPan">
        </div>
    </div>

</div> <!-- End masterContainer -->

