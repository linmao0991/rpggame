$(document).ready(function(){
    var playerHP = 0;
    var playerMP = 0;

    var monInfo = [ //[name,max hp, max mp, attack power, defense, experience]
            rockGolem = ["Rock Golem",200,100, 10, 10,50,],
            ironGolem = ["Iron Golem",300, 200, 5, 5,50,],
            fireGolem = ["Fire Golem",150,100,15,15,50,],
            giantCrab = ["Giant Crab",100,100,6,6,50],
        ]
    // item Data
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
        spellList: [spellData.fire,spellData.water,spellData.earth],
        inventory: [itemData[0],itemData[1],itemData[2]],
        randNames: ["Bob","Jerry","Barry","Jill","Heather","Kim"],
    }

    var menuFunctions = {
        loadInventory: function(){
            $("#inventoryList").html("");
            for (i = 0; i < playerInfo.inventory.length; i++){   
                $("#inventoryList").append("<p class='inventoryItem' item-type='"+playerInfo.inventory[i][2]+"'>"+playerInfo.inventory[i][0]+"</p>");
            }
        },
        loadPlayerStats: function(){
            $("#playerName").text("Name: "+playerInfo.name);
            $("#playerLevel").text("Level: "+playerInfo.level);
            $("#playerHp").text("HP: "+playerHP+"/"+playerInfo.maxHp);
            $("#playerMp").text("MP: "+playerMP+"/"+playerInfo.maxMp);
            $("#playerAtk").text("Attack Power: "+playerInfo.atk);
            $("#playerDef").text("Defense :"+playerInfo.def);
        },
        loadPlayerSpells: function(){
            for (i = 0; i < playerInfo.spellList.length; i++){
                $("#spellsList").append("<p class='playerSpell'>"+playerInfo.spellList[i].name+"</p>");
            }
        },
        updateGold: function(){
            $("#playerGold").text(playerInfo.gold);
        },
        initializeCharacter: function(){
            playerInfo.name = prompt("Please enter your character's name, hit cancel for random name.");
            if(playerInfo.name == null){
                playerInfo.name = playerInfo.randNames[Math.floor(Math.random() * playerInfo.randNames.length)];
            }
            playerHP = playerInfo.maxHp;
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

    var battleFunctions = {
        exploreDunLvl: function(){
            $("#battleText").append("<p class='m-0'>You explore the current level of the dungeon...</p>");
            $("#battleText").scrollTop($("#battleText").prop("scrollHeight"));
            var encounter = Math.floor(Math.random() * 10);
            console.log(encounter);
            setTimeout ( function (){
                if ( encounter <= 5 && encounter >=3) { 
                    $("#battleText").append("<p class='m-0'>-After awhile you find nothing.</p>");
                    $("#battleText").scrollTop($("#battleText").prop("scrollHeight"));
                }
    
                if ( encounter <= 2 && encounter >=0) {
                    $("#battleText").append("<p class='m-0'>-You wander around a corner and find a tresure chest!</p>");
                    var itemIndex = Math.floor(Math.random()* itemData.length);
                    setTimeout(function(){
                        $("#battleText").append("<p class='m-0'>--Inside the chest you find "+itemData[itemIndex][0]+"!</p>");
                        playerInfo.inventory.push(itemData[itemIndex]);
                        menuFunctions.loadInventory();
                        battleFunctions.loadBatMenuItems();
                        $("#battleText").scrollTop($("#battleText").prop("scrollHeight"));
                    },500);
                    console.log(playerInfo.inventory);
                }
    
                if( encounter >= 6 ){
                    $("#battleText").append("<p class='m-0'>-You wander around and monster appears from around the corner!</p>");
                    battleFunctions.loadMonster();
                    $("#battleText").scrollTop($("#battleText").prop("scrollHeight"));
                }
            },1000);
        },
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
        loadBatMenuSpells: function(){
            $("#batMenuSpells").html("");
            for (i = 0; i < playerInfo.spellList.length; i++){
                $("#batMenuSpells").append("<p class='playerSpell'>"+playerInfo.spellList[i].name+"</p>");
            }
        },
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
    
    menuFunctions.initializeCharacter();

    $("#exploreDunLvl").click(function (){
        battleFunctions.exploreDunLvl();
    });

});