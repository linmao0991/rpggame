$(document).ready(function(){
    // current player Hp used during battle.
    var playerHP = 0;
    // current player Mp used during battle.
    var playerMP = 0;
    // variable sets to 0 to disable the onclick function from calling exploreDunLvl method untill method has finished running.
    var crntlyexplor = 0;

    // Array containaing arrays of monsters.
    var monInfo = [ //[name,max hp, max mp, attack power, defense, experience]
            rockGolem = ["Rock Golem",200,100, 10, 10,50,],
            ironGolem = ["Iron Golem",300, 200, 5, 5,50,],
            fireGolem = ["Fire Golem",150,100,15,15,50,],
            giantCrab = ["Giant Crab",100,100,6,6,50],
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
        maxHp: 100,
        maxMp: 100,
        atk: 10,
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
            for (i = 0; i < playerInfo.inventory.length; i++){   
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
            crntlyexplor = 1;
            var bText =  $("#battleText");
            bText.append("<p class='m-0'>You explore the current level of the dungeon...</p>");
            bText.scrollTop($(bText).prop("scrollHeight"));
            var encounter = Math.floor(Math.random() * 10);
            console.log(encounter);
            setTimeout ( function (){
                if ( encounter <= 5 && encounter >=3) { 
                    bText.append("<p class='m-0'>-After awhile you find nothing.</p>");
                    bText.scrollTop($(bText).prop("scrollHeight"));
                    crntlyexplor = 0;
                }
    
                if ( encounter <= 2 && encounter >=0) {
                    bText.append("<p class='m-0'>--You wander around a corner and find a tresure chest!</p>");
                    var itemIndex = Math.floor(Math.random()* itemData.length);
                    setTimeout(function(){
                        var item = Math.floor(Math.random() * 2);
                        if( item == 0 ){
                        bText.append("<p class='m-0'>----Inside the chest you find "+itemData[itemIndex][0]+"!</p>");
                        bText.scrollTop($(bText).prop("scrollHeight"));
                        playerInfo.inventory.push(itemData[itemIndex]);
                        menuFunctions.loadInventory();
                        battleFunctions.loadBatMenuItems();
                        crntlyexplor = 0;
                        }
                        else {
                            var gold = Math.floor(Math.random() * 50) + 5;
                            bText.append("<p class='m-0'>----Inside the chest you find "+gold+" gold!</p>");
                            bText.scrollTop($(bText).prop("scrollHeight"));
                            playerInfo.gold = playerInfo.gold + gold;
                            menuFunctions.updateGold();
                            crntlyexplor = 0;
                        }
                    },500);
                    console.log(playerInfo.inventory);
                }
    
                if( encounter >= 6 ){
                    battleFunctions.loadMonster();
                    bText.append("<p class='m-0'>--You wander around and a <b>"+batMonData.firstMon.name+"</b> appears from around the corner!</p>");
                    bText.scrollTop($(bText).prop("scrollHeight"));
                    crntlyexplor = 0;
                }
            },1000);
        },
        // This functions randomly selects a monter from the monInfo array and sets its values into the appropriate batMonData object.
        loadMonster: function(){
            var ranIndex = Math.floor(Math.random() * monInfo.length);
            batMonData.firstMon.name = monInfo[ranIndex][0];
            batMonData.firstMon.maxHp = monInfo[ranIndex][1];
            batMonData.firstMon.curHp = monInfo[ranIndex][1];
            batMonData.firstMon.maxMp = monInfo[ranIndex][2];
            batMonData.firstMon.curMp = monInfo[ranIndex][2];
            batMonData.firstMon.attack = monInfo[ranIndex][3];
            batMonData.firstMon.defense = monInfo[ranIndex][4];
            batMonData.firstMon.experience = monInfo[ranIndex][5];
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
            battleFunctions.exploreDunLvl();
        }
    });

});