let number = 1
let baseUrl = `http://localhost:3000/monsters/?_limit=50&_page=${number }`

document.addEventListener("DOMContentLoaded", function(){
    fetchAllMonsters()
    document.querySelector(".add-monster-form").addEventListener("submit", addMonster)
    document.querySelector("#forward").addEventListener("click", pageForward)

})

function fetchAllMonsters(){
    fetch(baseUrl)
    .then(resp => resp.json())
    .then(monsterArr => {
        monsterArr.forEach(renderMonster)
    })
}

function renderMonster(monster){
   let monsterDiv = document.createElement("div")
   document.querySelector("#monster-container").appendChild(monsterDiv)
   monsterDiv.id = `monster-${monster.id}`
   monsterDiv.classList.add("monster-div")

   //create h1 tag
   monsterName = document.createElement('h2')
   monsterName.innerText = `${monster.name} and I'm ID ${monster.id}`
   monsterDiv.appendChild(monsterName)

   //create h3 tag
   monsterAge = document.createElement('h4')
   monsterAge.innerText = (monster.age)
   monsterDiv.appendChild(monsterAge)

   //create p tag
   monsterInfo = document.createElement('p')
   monsterInfo.innerText = (monster.description)
   monsterDiv.appendChild(monsterInfo)
}

function addMonster(e){
    event.preventDefault()
    let data = {
        name: event.currentTarget[0].value,
        age: event.currentTarget[1].value,
        description: event.currentTarget[2].value
    }
    fetch(baseUrl, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then( renderMonster)

}

function pageForward(e){
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${number += 1}`)
    .then(resp => resp.json())
    .then(monsterArr => {
        document.querySelector("#monster-container").innerHTML= ""
        monsterArr.forEach(renderMonster)
    })
}

// monsterArr.forEach(monster =>{
//     if (monster.id < 50){
//         renderMonster(monster)
//     }
// })