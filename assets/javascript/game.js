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
        iron: {
            iD: 00,
            iName: "Iron",
            iValue: 10,
            iType: 0,
        },
        meat:{
            iD: 01,
            iName: "Meat",
            iValue: 1,
            iType: 1,
        },
        ironSword: {
            iD: 02,
            iName: "Iron Sword",
            iValue: 50,
            iType: 2,
        },
        ironHelm: {
            iD: 03,
            iName: "Iron Helm",
            iValue: 50,
            iType: 3,
        },
        ironArmor: {
            iD: 04,
            iName: "Iron Armor",
            iValue: 50,
            iType: 4,
        }
    }

    var spellData = {
        fire: {
            dmg: 10,
            mpCost: 10,
        },
        water: {
            dmg: 10,
            mpCost: 10,
        },
        earth: {
            dmg: 10,
            mpCost: 10,
        },
        wind: {
            dmg: 10,
            mpCost: 10,
        },
    }

    var playerInfo = {
        name: "",
        maxHp: 100,
        maxMp: 100,
        atk: 10,
        def: 10,
        gold: 0,
        inventory: [],
    }

});