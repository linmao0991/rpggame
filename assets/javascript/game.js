document.addEventListener('DOMContentLoaded', function(){
    var playerHP = 0;
    var playerMP = 0;

    var npcInfo = [ //[name,max hp, max mp, attack power, defense, experience]
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
            ironSword = ["Iron Sword", 50, 2,],
            ironHelm = ["Iron Helm",50,3,],
            ironArmor = ["Iron Armor",50,4,],
    ]

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
            menuFunctions.updateGold();
            menuFunctions.loadPlayerSpells();
            menuFunctions.loadPlayerStats();
            menuFunctions.loadInventory();
        },
    }

    var battleFunctions = {
        loadMonster: function(){

        },
        loadBatMenuSpells: function(){
            for (i = 0; i < playerInfo.spellList.length; i++){
                $("#batMenuSpells").append("<p class='playerSpell'>"+playerInfo.spellList[i].name+"</p>");
            }
        },
        loadBatMenuItems: function(){
            for ( i = 0; i < playerInfo.inventory.length; i++){
                if(playerInfo.inventory[i][2] == 1){
                    $("#batMenuItem").append("<p class='usableItem'>"+playerInfo.inventory[i][0]+"</p>")
                }
                else{

                }
            }
        },
    }
    
    $(document).on("keypress", battleFunctions.loadBatMenuSpells);
    $(document).on("keypress", battleFunctions.loadBatMenuItems);
    menuFunctions.initializeCharacter();
});