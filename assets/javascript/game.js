$(document).ready(function(){
    $("#firstMon").fadeOut();
    // current player Hp used during battle.
    var curPlayerHp = 0;
    // current player Mp used during battle.
    var curPlayerMp = 0;
    // variable sets to 0 to disable the onclick function from calling exploreDunLvl method untill method has finished running.
    var crntlyexplor = 0;
    // variable used to start and end combat.
    var crntlyInBat = 0;
    // variable to start and end player turn
    var playerTurn = 0;

    var bText = $("#battleText");
    var plyrTmr = $("#plyrTmr");
    var dmgText = $("#dmgText");
    var firstMonTmr = $("#firstMonTmr");

    // Array containaing arrays of monsters.
    var monInfo = [ //[name,max hp, max mp, attack power, defense, experience,image source,element type,]
            demonKing = ["Demon Bug",50,150, 10, 8,75,"./assets/images/evilgod.png","dark",],
            demonLord = ["Demon Lord",50, 100, 8, 15,25,"./assets/images/demon.png","dark"],
            fireGolem = ["Fire Golem",35,200,15,8,25,"./assets/images/Fury.png","fire",],
            fireBlob = ["Fire Blob",20,100,6,5,10,"./assets/images/sunslime.png","fire",],
        ];

    // itemData array contains array of items.
    // value is the gold value of the item
    // type is the type of item
    //      0 = misc item
    //      1 = consumable
    //      2 = weapon
    //      3 = helmet
    //      4 = armor
    var itemData = [ //[name, value, type,player adjust value]
            ["Iron",10,0,0],
            ["Meat",1,1,10],
            ["Paper",1,0,0],
            ["Coal",2,0,0],
            ["Wood",1,0,0],
            ["Leather",5,0,0],
            ["Healing Potion", 20, 1,20],
            ["Mana Potion",20,1,20],
            ["Iron Sword", 50, 2, 2],
            ["Iron Helm",50,3, 1],
            ["Iron Armor",50,4, 2],
        ];

    // Object to store battle monster data, once battle is finished this data will be reset to default values.
    // Object contains 3 objects. Possiblly for multiple monster battles.
    var batMonData = {
        firstMon: {
            name: "",
            maxHp: 0,
            curHp: 0,
            maxMP: 0,
            curMp: 0,
            attack: 0,
            defense: 0,
            experience: 0,
            htmlID: "#firstMon",
            srcDir: "",
        },
        secondMon: {
            name: "",
            maxHp: 0,
            curHp: 0,
            maxMP: 0,
            curMp: 0,
            attack: 0,
            defense: 0,
            experience: 0,
            htmlID: "#secondMon",
        },
        thirdMon: {
            name: "",
            maxHp: 0,
            curHp: 0,
            maxMP: 0,
            curMp: 0,
            attack: 0,
            defense: 0,
            experience: 0,
            htmlID: "#thirdMon",
        },
    };

    //Object spellData contains spell objects.
    var spellData = {
        fire: {
            name: "Fire",
            dmg: 10,
            mpCost: 10,
            element: "fire",
            cast: function(){

            }
        },
        water: {
            name: "Water",
            dmg: 10,
            mpCost: 10,
            element: "water",
        },
        earth: {
            name: "Earth",
            dmg: 10,
            mpCost: 10,
            element: "earth",
        },
        wind: {
            name: "Wind",
            dmg: 10,
            mpCost: 10,
            element: "wind",
        },
        heal: {
            name: "Heal",
            heal: 50,
            mpCost: 10,
            element: "Holy",
            cast: function(){
            },
        }
    };

    // Object to store player information.
    var playerInfo = {
        name: "",
        level: 1,
        experience: 0,
        maxHp: 100,
        maxMp: 100,
        atk: 100,
        hit: 50,
        def: 10,
        gold: 0,
        // equipment list
        equipList: [],
        // Array of spells the user can use.
        spellList: [spellData.fire,spellData.water,spellData.earth,spellData.heal],
        // Array of items the user has.
        /* New structure for inventory
        inventory: [
            {item: itemData[0], itemCount: int,},
            {item: itemData[1], itemCount: int,},
        ]
        */
        inventory: [
            //[itemData[Index],Count]
            [itemData[0],1,],
            [itemData[1],1,],
            [itemData[2],1,],
        ],
        // Random names if user hits cancel when prompt to type in a name,
        randNames: ["Bob","Jerry","Barry","Jill","Heather","Kim"],
    };

    // Object containing the functions pertaining to the left window menu in the html.
    var menuFunctions = {
        // Loads inventory based on the playerInfo object's inventory array.
        loadInventory: function(){
            var invList = $("#inventoryList");
            invList.html("");
            for (var i = 0; i < playerInfo.inventory.length; i++){
                var pInv =  playerInfo.inventory[i];
                invList.append("<p class='inventoryItem' item-type='"+pInv[0][0]+"'><span>"+pInv[1]+"</span> - <span>"+pInv[0][0]+"</span></p>");
            };
        },
        //Loads player stats based on the playerInfo object.
        loadPlayerStats: function(){
            $("#playerName").text("Name: "+playerInfo.name);
            $("#playerLevel").text("Level: "+playerInfo.level);
            $("#playerHp").text("HP: "+curPlayerHp+"/"+playerInfo.maxHp);
            $("#playerMp").text("MP: "+curPlayerMp+"/"+playerInfo.maxMp);
            $("#playerAtk").text("Attack Power: "+playerInfo.atk);
            $("#playerHit").text("Hit Bonus: "+playerInfo.hit);
            $("#playerDef").text("Defense: "+playerInfo.def);
            $("#playerExp").text("Experience: "+playerInfo.experience);
        },
        // Loads spells based on the playerInfo object's spellList array.
        loadPlayerSpells: function(){
            for (i = 0; i < playerInfo.spellList.length; i++){
                $("#spellsList").append("<p class='playerSpell'>"+playerInfo.spellList[i].name+"</p>");
            };
        },
        // Updates the playerInfo object's gold value.
        updateGold: function(){
            $("#playerGold").text(playerInfo.gold);
        },
        // Function to initialize the game, promopting the use to input a name or randomly generate a name. Then calls the methods to populate the information into the html.
        initializeCharacter: function(){
            playerInfo.name = prompt("Please enter your character's name, hit cancel for random name.");
            if(playerInfo.name == null){
                playerInfo.name = playerInfo.randNames[Math.floor(Math.random() * playerInfo.randNames.length)];
            }
            // Sets the players current Hp to its maxHp
            curPlayerHp = playerInfo.maxHp;
            // Sets the players current Mp to its maxMp
            curPlayerMp = playerInfo.maxMp;
            menuFunctions.updateGold();
            menuFunctions.loadPlayerSpells();
            menuFunctions.loadPlayerStats();
            menuFunctions.loadInventory();
            battleFunctions.loadBatMenuItems();
            battleFunctions.loadBatMenuSpells();
        },
        //Function to add item to inventory
        playerInvAddItem: function(x){
            // x is the itemData array index
            var index = x;
            var inventory = playerInfo.inventory;
            //Adds the itemData index to the players inventory and the count.
            inventory.push([itemData[index], 1]);
            //Reloads menu and battle inventories
            menuFunctions.loadInventory();
            battleFunctions.loadBatMenuItems();
        },
        //Function to add to the count of existing item in player inventory
        playerInvAddCount: function(x){
            // x is the itemData array index
            var itemArrayIndex = x;
            // Calls the array method and passes through the itemData array index and returns the index of the item in players inventory
            var index = playerInfo.inventory.invCheckLoop(itemArrayIndex);
            var inventoryItem = playerInfo.inventory[index];
            //Adds 1 to the count of items in the players inventory
            inventoryItem[1] = inventoryItem[1] + 1;
            //Reloads menu and battle inventories
            menuFunctions.loadInventory();
            battleFunctions.loadBatMenuItems();
        },
    };

    // battleFunctions object contains all the methods used for battles and exploring dungeon levels.
    var battleFunctions = {
        //This functions is randomly chooses a integer and sets it to variable counter. This variable is used to either find nothing, find a tresure chest, or find a monster.
        exploreDunLvl: function(){
            bText.append("<p class='m-0'>-You explore the current level of the dungeon...</p>");
            bText.scrollTop($(bText).prop("scrollHeight"));
            // Random number to determine the encounter
            var encounter = Math.floor(Math.random() * 10)+1;
            // if encounter is 1 - 3 then find find a treasure chest
            if ( encounter <= 3 && encounter >=1) {
                var itemArrayIndex = Math.floor(Math.random()* itemData.length);
                setTimeout(function(){ 
                    bText.append("<p class='m-0'>---You wander around a corner and find a tresure chest!</p>");
                    bText.scrollTop($(bText).prop("scrollHeight"));
                    setTimeout(function(){
                        // var chestContent = Math.floor(Math.random() * 2);
                        var chestContent = 0;
                        if( chestContent == 0 ){
                            bText.append("<p class='m-0'>----Inside the chest you find <b>"+itemData[itemArrayIndex][0]+"</b>!</p>");
                            bText.scrollTop($(bText).prop("scrollHeight"));
                            if(!Number.isInteger(playerInfo.inventory.invCheckLoop(itemArrayIndex))){
                                menuFunctions.playerInvAddItem(itemArrayIndex);
                            }else{
                                menuFunctions.playerInvAddCount(itemArrayIndex);
                            };
                            crntlyexplor = 0;
                        }
                        else {
                            var gold = Math.floor(Math.random() * 50) + 5;
                            bText.append("<p class='m-0'>----Inside the chest you find <b>"+gold+"</b> gold!</p>");
                            bText.scrollTop((bText).prop("scrollHeight"));
                            playerInfo.gold = playerInfo.gold + gold;
                            menuFunctions.updateGold();
                            crntlyexplor = 0;
                        };
                    },500);
                },500);
            //Else if encouanter is 8-10 then encounter monster
            }else if( encounter >= 8 ){
                setTimeout (function (){
                    dungeonFunctions.dungeonMusic(0);
                    battleFunctions.battleMusic(1);
                    battleFunctions.loadMonster();
                    bText.append("<p class='m-0'>---You wander around and a <b>"+batMonData.firstMon.name+"</b> appears from around the corner!</p>");
                    bText.scrollTop($(bText).prop("scrollHeight")); 
                    crntlyInBat = 1;
                    battleFunctions.monTurnTimer(batMonData.firstMon);
                },500);
            //if 4-7 then encounter nothing.
            }else{
                setTimeout (function (){
                    bText.append("<p class='m-0'>---After awhile you find nothing.</p>");
                    bText.scrollTop($(bText).prop("scrollHeight"));
                    crntlyexplor = 0;
                },500);
            };
        },
        //Method for monster attacks
        monAtk: function(monD){
            if( monD.curHp > 0){
                var hitRoll = Math.floor(Math.random() * 20)+1;
                if ( hitRoll > playerInfo.def){
                    var dmgDone = monD.attack - (playerInfo.def * .50);
                    curPlayerHp -= dmgDone;
                    var percHp = 100 * (curPlayerHp/playerInfo.maxHp);
                    bText.append("<p class='m-0' style='color: red;'>*-<b>"+monD.name+"</b> melee hits you for <b>"+dmgDone+"</b> damage!-*</p>");
                    bText.scrollTop($(bText).prop("scrollHeight"));
                    if (curPlayerHp > (playerInfo.maxHp * .33)){
                        $("#plyrHp").css({"width": percHp+"px",});
                        $("#pDmgText").html(dmgDone);
                        $("#pDmgText").show();
                        $("#pDmgText").fadeOut("slow");
                        menuFunctions.loadPlayerStats();
                        battleFunctions.monTurnTimer(monD);
                    }else{
                        $("#plyrHp").css({"width": percHp+"px","background-color": "red"});
                        $("#pDmgText").html(dmgDone);
                        $("#pDmgText").show();
                        $("#pDmgText").fadeOut("slow");
                        menuFunctions.loadPlayerStats();
                        battleFunctions.monTurnTimer(monD);
                    };
                }else{
                    bText.append("<p class='m-0' style='color: red;'>*-<b>"+monD.name+"</b> lunges at you, but you <b>Dodge</b>!-*</p>");
                    bText.scrollTop($(bText).prop("scrollHeight"));
                    $("#pDmgText").html("Dodge!");
                    $("#pDmgText").show();
                    $("#pDmgText").fadeOut("slow");
                    battleFunctions.monTurnTimer(monD);
                };
            };
        },
        //Monster turn timer bar
        monTurnTimer: function(monD){
            var monInter = setInterval(pTmr, 100);
            var mTurnTimer = 6000;
            var interIterator = 1;
            function pTmr(){
                if (monD.curHp <= 0){
                    clearInterval(monInter);
                    firstMonTmr.css({"width": 0+"px"});
                    interIterator = 1;
                }
                else if (interIterator == (mTurnTimer/100)){
                    clearInterval(monInter);
                    firstMonTmr.css({"width": 0+"px"});
                    interIterator = 1;
                    battleFunctions.monAtk(monD);
                }
                else{
                    var pixel = 100/(mTurnTimer/100);//Formula to reduce pixels so animation is smooth and accurate.
                    var tmrBar = 0 + pixel*interIterator;
                    firstMonTmr.css({"width": tmrBar+"px"});
                    interIterator++;
                };
            };
        },
        //player Slash Attack
        meleeAtkSlash: function(){
            var hitRoll = (Math.floor(Math.random() * 20)+1) + playerInfo.hit;
            var monD = batMonData.firstMon;
            if ( hitRoll > monD.defense){
                var dmgDone = playerInfo.atk;
                monD.curHp -= dmgDone;
                var percHp = 100 * (monD.curHp/monD.maxHp);
                bText.append("<p class='m-0' style='color: green;'>*-You Slash <b>"+monD.name+"</b> for <b>"+dmgDone+"</b> damage!-*</p>");
                bText.scrollTop($(bText).prop("scrollHeight"));
                //If monster curHP <= 0;
                if( monD.curHp <= 0) {
                    battleFunctions.onMonDeath(monD);
                }
                dmgText.html(dmgDone);
                dmgText.show();
                dmgText.fadeOut("slow");
                $("#firstMonHp").css({"width": percHp+"px",});
                battleFunctions.pTurnTimer();
            }else{
                bText.append("<p class='m-0' style='color: green;'>*-You Slash, but <b>"+monD.name+"</b> <b>Dodges</b>!-*</p>");
                bText.scrollTop($(bText).prop("scrollHeight"));
                dmgText.html("Dodge!");
                dmgText.show();
                dmgText.fadeOut("slow");
                battleFunctions.pTurnTimer();
            };
        },
        //Method for using items
        pUseItem: function(){

        },
        //Player turn timer bar
        pTurnTimer: function(){
            var plyrInter = setInterval(pTmr, 100);
            var pTurnTimer = 4000;
            var interIterator = 1;
            function pTmr(){
                if (interIterator == (pTurnTimer/100)){
                    clearInterval(plyrInter);
                    plyrTmr.css({"width": 100+"px"});
                    interIterator = 1;
                    playerTurn = 0;
                }
                else{
                    var pixel = 100/(pTurnTimer/100);//Formula to reduce pixels so animation is smooth and accurate.
                    var tmrBar = 0 + pixel*interIterator;
                    plyrTmr.css({"width": tmrBar+"px"});
                    interIterator++;
                };
            };
        },
        //Method called when monster is defeated.
        onMonDeath: function(monD){
            bText.append("<p class'm-0' style='color:black;'> You Defeated <b>"+monD.name+"</b>! You gained <b>"+monD.experience+"</b> exp!");
            bText.scrollTop($(bText).prop("scrollHeight"));
            playerInfo.experience += monD.experience;
            this.clearBatMonData();
            crntlyInBat = 0;
            crntlyexplor = 0;
            $("#firstMon").fadeOut("slow");
            menuFunctions.loadPlayerStats();
            battleFunctions.battleMusic(0);
            dungeonFunctions.dungeonMusic(1);
        },
        //Clears batMonData object
        clearBatMonData: function(){
            var x = batMonData.firstMon;
            x.name = "";
            x.maxHp = 0;
            x.curHp = 0;
            x.maxMp = 0;
            x.curHp = 0;
            x.attack = 0;
            x.defense = 0;
            x.experience = 0;
            x.srcDir = "";
        },
        // This Method randomly selects a monter from the monInfo array and sets its values into the appropriate batMonData object.
        loadMonster: function(){
            var ranIndex = Math.floor(Math.random() * monInfo.length);
            var monData = batMonData.firstMon;
            monData.name = monInfo[ranIndex][0];
            monData.maxHp = monInfo[ranIndex][1];
            monData.curHp = monInfo[ranIndex][1];
            monData.maxMp = monInfo[ranIndex][2];
            monData.curMp = monInfo[ranIndex][2];
            monData.attack = monInfo[ranIndex][3];
            monData.defense = monInfo[ranIndex][4];
            monData.experience = monInfo[ranIndex][5];
            monData.srcDir = monInfo[ranIndex][6];
            $(batMonData.firstMon.htmlID).fadeIn("slow");
            $("#firstMonHp").css("width", "100px");
            $("#firstMonImg").attr("src",monData.srcDir);
        },
        //Method load the players known spells into the battle window menu in the html.
        loadBatMenuSpells: function(){
            $("#batMenuSpells").html("");
            for (i = 0; i < playerInfo.spellList.length; i++){
                $("#batMenuSpells").append("<button type='button' class='btn btn-warning m-2 spellButton' id='"+playerInfo.spellList[i].name+"'>"+playerInfo.spellList[i].name+"</button>");
            };
        },
        //Method loads the players usuable items into the battle window menu in the hteml.
        loadBatMenuItems: function(){
            $("#batMenuItem").html("");
            for ( i = 0; i < playerInfo.inventory.length; i++){
                if(playerInfo.inventory[i][0][2] == 1){
                    var pInv = playerInfo.inventory[i];
                    $("#batMenuItem").append("<a class='usableItem'>"+pInv[0][0]+" ("+pInv[1]+")</a>");
                }
                else{
                };
            };
        },
        //Method to control battle music
        battleMusic: function(control){
            var x = control;
            if( x == 1){
            document.getElementById("battleMusic").play();
            }
            else{
            document.getElementById("battleMusic").pause();
            };
        },
    };

    //Object for all dungeon methods
    var dungeonFunctions = {
        //Method to control dungeon music.
        dungeonMusic: function(control){
            var x = control;
            if( x == 1 ){
                document.getElementById("exploringMusic").play();
            }else{
                document.getElementById("exploringMusic").pause();
            };
        },
    };

    //Section for my array methods
    Array.prototype.invCheckLoop = function (index){
        var itemIndex = index;
        for  (var i = 0; i < playerInfo.inventory.length; i++){
            var currentIndex = playerInfo.inventory[i];
            if( currentIndex[0][0] == itemData[itemIndex][0]){
                return i;
            };
        };
        return false;
    };

    //Called the method initializeCharacter in the menuFunctions.
    menuFunctions.initializeCharacter();

    //Onclick event for the button with id exploreDunLvl. Calls exploreDunLvl method if crntlyexplor variable is set to 0, else do nothing.
    $("#exploreDunLvl").click(function (){
        if ( crntlyexplor == 0){
            crntlyexplor = 1;
            battleFunctions.exploreDunLvl();
            dungeonFunctions.dungeonMusic(1);
        }
    });
    //On click event for Slash button under attack tab in the battle menu
    $("#atkSlash").click(function(){
        if ( crntlyInBat == 1 && playerTurn == 0){
            playerTurn = 1;
            battleFunctions.meleeAtkSlash();
        }else{
            
        };
    });
});