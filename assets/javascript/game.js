document.addEventListener('DOMContentLoaded', function(){
    var playerHP = 0;
    var playerMP = 0;
    var npcHp = 0;
    var npcMP = 0;


    var npcInfo = {
        rockGolem: {
            name: "rockGolem",
            maxHp: 200, 
            maxMp: 100, 
            atk: 10, 
            def: 10,
            inventory: [],
        },
        ironGolem: {
            name: "ironGolem",
            maxMp: 300, 
            mp: 200, 
            atk: 5, 
            def: 5,
            inventory: [],
        },
        fireGolem: {
            name: "fireGolem",
            maxMp: 150,
            mp: 100,
            atk: 15,
            def: 15,
            inventory: [],
        },
        giantCrab: {
            name: "giantCrab",
            maxMp: 100,
            mp: 100,
            atk: 6,
            def: 6,
            inventory: [],
        },
    }
    // item Data
    // iValue is the gold value of the item
    // iType is the type of item
    //      0 = misc item
    //      1 = consumable
    //      2 = weapon
    //      3 = helmet
    //      4 = armor
    var itemData = {
        iD00: {
            iName: "Iron",
            iValue: 10,
            iType: 0,
        },
        iD01:{
            iName: "Meat",
            iValue: 1,
            iType: 1,
        },
        iD02: {
            iName: "Iron Sword",
            iValue: 50,
            iType: 2,
        },
       iD03: {
            iName: "Iron Helm",
            iValue: 50,
            iType: 3,
        },
        iD04: {
            iName: "Iron Armor",
            iValue: 50,
            iType: 4,
        }
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
        inventory: [itemData.iD00,itemData.iD01,itemData.iD02,itemData.iD03,itemData.iD04,itemData.iD00,itemData.iD00,itemData.iD00,itemData.iD00,itemData.iD00,itemData.iD00,itemData.iD00,itemData.iD00,],
        randNames: ["Bob","Jerry","Barry","Jill","Heather","Kim"],
    }

    var menuFunctions = {
        loadInventory: function(){
            for (i = 0; i < playerInfo.inventory.length; i++){
                var currentItem = $("<p>");
                currentItem.addClass("inventoryItem");
                currentItem.attr("item-type", playerInfo.inventory[i].iType);
                currentItem.text(playerInfo.inventory[i].iName);
                $("#inventoryList").append(currentItem);
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
                var currentSpell = $("<p>");
                currentSpell.addClass("playerSpell");
                currentSpell.text(playerInfo.spellList[i].name);
                $("#spellsList").append(currentSpell);
            }
        },
    }
    playerInfo.name = prompt("Please enter your character's name, hit cancel for random name.");
    if(playerInfo.name == null){
        playerInfo.name = playerInfo.randNames[Math.floor(Math.random() * playerInfo.randNames.length)];
    }
    menuFunctions.loadPlayerSpells();
    menuFunctions.loadInventory();
    menuFunctions.loadPlayerStats();
});