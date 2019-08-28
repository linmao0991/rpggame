document.addEventListener('DOMContentLoaded', function(){
    var npcInfo = [
        {
            name: "rockGolem",
            hp: 200, 
            mp: 100, 
            atk: 10, 
            def: 10,
            items: ["rocks","dirt","iron","coal"],
        },
        {
            name: "waterGolem",
            hp: 300, 
            mp: 200, 
            atk: 5, 
            def: 5,
            items: ["water","ice","mist in a bottle"],
        },
        {
            name: "fireGolem",
            hp: 150,
            mp: 100,
            atk: 15,
            def: 15,
            items: ["fire", "coal", "lava"],
        },
        {
            name: "giantCrab",
            hp: 100,
            mp: 100,
            atk: 6,
            def: 6,
            items: ["crab meat", "giant crab claw", "crab shell"],
        },
    ]
   
    var playerInfo = {
        name: "",
        hp: 100,
        mp: 100,
        atk: 10,
        def: 10,
        inventory: [""],
    }
    console.log(npcInfo[1].name);
    monster = Math.floor(Math.random() * npcInfo.length);
    console.log(monster);
    itemIndex = Math.floor(Math.random() * npcInfo[monster].items.length);
    console.log(itemIndex);
    // itemDrop = 
    // console.log(itemDrop);
    // console.log(npcInfo[Math.floor(Math.random() * npcInfo.length)].items[Math.floor(Math.random() * this.items.length)]);
    // playerInfo.inventory.push()
    // console.log(npcInfo[Math.random(Math.floor * npcInfo.length)].items[3]);
});