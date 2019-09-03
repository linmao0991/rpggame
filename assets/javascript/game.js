$(document).ready(function(){
    // current player Hp used during battle.
    var playerHP = 0;
    // current player Mp used during battle.
    var playerMP = 0;
    // variable sets to 0 to disable the onclick function from calling exploreDunLvl method untill method has finished running.
    var crntlyexplor = 0;
    // variable used to start and end combat.
    var crntlyInBat = 0;
    // variable to start and end player turn
    var playerTurn = 0;

    var bText = $("#battleText");
    var plyrTmr = $("#plyrTmr");
    var dmgText = $("#dmgText");

    // Array containaing arrays of monsters.
    var monInfo = [ //[name,max hp, max mp, attack power, defense, experience]
            rockGolem = ["Rock Golem",50,100, 10, 10,50,],
            ironGolem = ["Iron Golem",50, 100, 10, 10,50,],
            fireGolem = ["Fire Golem",35,200,15,7,50,],
            giantCrab = ["Giant Crab",20,100,6,4,50],
        ]

    // itemData array contains array of items.
    // value is the gold value of the item
    // type is the type of item
    //      0 = misc item
    //      1 = consumable
    //      2 = weapon
    //      3 = helmet
    //      4 = armor
    var itemData = [ //[name, value, type]
            iron = ["Iron",10,0,],
            meat = ["Meat",1,1,],
            paper = ["Paper",1,0],
            coal = ["Coal",2,0],
            wood = ["Wood",1,0],
            leather = ["Leather",5,0],
            healingPotion = ["Healing Potion", 20, 1],
            manaPotion = ["Mana Potion",20,1],
            ironSword = ["Iron Sword", 50, 2,],
            ironHelm = ["Iron Helm",50,3,],
            ironArmor = ["Iron Armor",50,4,],
    ]

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
        },
    }

    //Object spellData contains spell objects.
    var spellData = {
        fire: {
            name: "Fire",
            dmg: 10,
            mpCost: 10,
        },
        water: {
            name: "Water",
            dmg: 10,
            mpCost: 10,
        },
        earth: {
            name: "Earth",
            dmg: 10,
            mpCost: 10,
        },
        wind: {
            name: "Wind",
            dmg: 10,
            mpCost: 10,
        },
    }

    // Object to store player information.
    var playerInfo = {
        name: "",
        level: 1,
        experience: 0,
        maxHp: 100,
        maxMp: 100,
        atk: 50,
        def: 10,
        gold: 0,
        // equipment list
        equipList: [],
        // Array of spells the user can use.
        spellList: [spellData.fire,spellData.water,spellData.earth],
        // Array of items the user has.
        inventory: [itemData[0],itemData[1],itemData[2]],
        // Random names if user hits cancel when prompt to type in a name,
        randNames: ["Bob","Jerry","Barry","Jill","Heather","Kim"],
    }

    // Object containing the functions pertaining to the left window menu in the html.
    var menuFunctions = {
        // Loads inventory based on the playerInfo object's inventory array.
        loadInventory: function(){
            var invList = $("#inventoryList");
            invList.html("");
            for (var i = 0; i < playerInfo.inventory.length; i++){   
                invList.append("<p class='inventoryItem' item-type='"+playerInfo.inventory[i][2]+"'>"+playerInfo.inventory[i][0]+"</p>");
            }
        },
        //  Loads player stats based on the playerInfo object.
        loadPlayerStats: function(){
            $("#playerName").text("Name: "+playerInfo.name);
            $("#playerLevel").text("Level: "+playerInfo.level);
            $("#playerHp").text("HP: "+playerHP+"/"+playerInfo.maxHp);
            $("#playerMp").text("MP: "+playerMP+"/"+playerInfo.maxMp);
            $("#playerAtk").text("Attack Power: "+playerInfo.atk);
            $("#playerDef").text("Defense :"+playerInfo.def);
            
        },
        // Loads spells based on the playerInfo object's spellList array.
        loadPlayerSpells: function(){
            for (i = 0; i < playerInfo.spellList.length; i++){
                $("#spellsList").append("<p class='playerSpell'>"+playerInfo.spellList[i].name+"</p>");
            }
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
            playerHP = playerInfo.maxHp;
            // Sets the players current Mp to its maxMp
            playerMP = playerInfo.maxMp;
            menuFunctions.updateGold();
            menuFunctions.loadPlayerSpells();
            menuFunctions.loadPlayerStats();
            menuFunctions.loadInventory();
            battleFunctions.loadBatMenuItems();
            battleFunctions.loadBatMenuSpells();
            console.log(playerInfo.inventory);
        },
    }

    // battleFunctions object contains all the methods used for battles and exploring dungeon levels.
    var battleFunctions = {
        //This functions is randomly chooses a integer and sets it to variable counter. This variable is used to either find nothing, find a tresure chest, or find a monster.
        exploreDunLvl: function(){
            bText.append("<p class='m-0'>-You explore the current level of the dungeon...</p>");
            bText.scrollTop($(bText).prop("scrollHeight"));
            var encounter = Math.floor(Math.random() * 10);
            console.log(encounter);

            if ( encounter <= 2 && encounter >=0) {
                var itemIndex = Math.floor(Math.random()* itemData.length);
                setTimeout(function(){ 
                    bText.append("<p class='m-0'>---You wander around a corner and find a tresure chest!</p>");
                    bText.scrollTop($(bText).prop("scrollHeight"));
                    setTimeout(function(){
                        var item = Math.floor(Math.random() * 2);
                        if( item == 0 ){
                        bText.append("<p class='m-0'>----Inside the chest you find <b>"+itemData[itemIndex][0]+"</b>!</p>");
                        bText.scrollTop($(bText).prop("scrollHeight"));
                        playerInfo.inventory.push(itemData[itemIndex]);
                        menuFunctions.loadInventory();
                        battleFunctions.loadBatMenuItems();
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
            }else if( encounter >= 6 ){
                setTimeout (function (){
                    battleFunctions.loadMonster();
                    bText.append("<p class='m-0'>---You wander around and a <b>"+batMonData.firstMon.name+"</b> appears from around the corner!</p>");
                    $("#firstMon").fadeIn("slow");
                    bText.scrollTop($(bText).prop("scrollHeight")); 
                    crntlyInBat = 1;
                },500);
            }else{
                setTimeout (function (){
                    bText.append("<p class='m-0'>---After awhile you find nothing.</p>");
                    bText.scrollTop($(bText).prop("scrollHeight"));
                    crntlyexplor = 0;
                },500);
            }
        },
        meleeAtkSlash: function(){
            var dmgDone = playerInfo.atk - (batMonData.firstMon.defense * .50);
            var monD = batMonData.firstMon;
            monD.curHp = monD.curHp - dmgDone;
            var percHp = 100 * (monD.curHp/monD.maxHp);

            bText.append("<p class='m-0' style='color: green;'>*-You Slash <b>"+monD.name+"</b> for <b>"+dmgDone+"</b> damage!-*</p>");
            bText.scrollTop($(bText).prop("scrollHeight"));
            //If monster curHP <= 0;
            if( monD.curHp <= 0) {
                battleFunctions.onMonDeath(monD);
            }

                // dmgText.html(dmgDone);
                // dmgText.fadeOut("slow");
            $("#firstMonHp").css({"width": percHp+"px",});
            battleFunctions.pTurnTimer();
        },
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
                    var plyrBar = 100 - 2.5*interIterator;
                    plyrTmr.css({"width": plyrBar+"px"});
                    interIterator++;
                };
            };
        },
        onMonDeath: function(monD){
            bText.append("<p class'm-0' style='color:black;'> You Defeated <b>"+monD.name+"</b>! You gained <b>"+monD.experience+"</b> exp!");
            bText.scrollTop($(bText).prop("scrollHeight"));
            this.clearBatMonData();
            crntlyInBat = 0;
            crntlyexplor = 0;
            $("#firstMon").fadeOut("slow");
            console.log(batMonData);
        },
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
        },
        // This functions randomly selects a monter from the monInfo array and sets its values into the appropriate batMonData object.
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
            console.log(batMonData);
        },
        //Function load the players known spells into the battle window menu in the html.
        loadBatMenuSpells: function(){
            $("#batMenuSpells").html("");
            for (i = 0; i < playerInfo.spellList.length; i++){
                $("#batMenuSpells").append("<p class='playerSpell'>"+playerInfo.spellList[i].name+"</p>");
            }
        },
        //Function loads the players usuable items into the battle window menu in the hteml.
        loadBatMenuItems: function(){
            $("#batMenuItem").html("");
            for ( i = 0; i < playerInfo.inventory.length; i++){
                if(playerInfo.inventory[i][2] == 1){
                    $("#batMenuItem").append("<p class='usableItem'>"+playerInfo.inventory[i][0]+"</p>");
                }
                else{
                }
            }
        },
    }
    //Called the method initializeCharacter in the menuFunctions.
    menuFunctions.initializeCharacter();
    //Onclick event for the button with id exploreDunLvl. Calls exploreDunLvl method if crntlyexplor variable is set to 0, else do nothing.
    $("#exploreDunLvl").click(function (){
        if ( crntlyexplor == 0){
            crntlyexplor = 1;
            battleFunctions.exploreDunLvl();
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