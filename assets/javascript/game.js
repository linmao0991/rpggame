document.addEventListener('DOMContentLoaded', function(){
    var npcInfo = [
        {
            name: "rockGolem",
            hp: 200, 
            mp: 100, 
            atk: 10, 
            def: 10,
            items: ["rocks","dirt","iron","coal",],
        },
        {
            name: "waterGolem",
            hp: 300, 
            mp: 200, 
            atk: 5, 
            def: 5,
            item: [""],
        },
        {
            name: "fireGolem",
            hp: 150,
            mp: 100,
            atk: 15,
            def: 15,
            items: [""],
        }
    ]

    console.log(npcInfo[0].items[3]);
});