const URL = "http://localhost:3000/monsters"
function nextPage(){
    const num = 1
   document.getElementById("create-monster").remove

    fetchAllMonsters(num +1)
}
function previousPage(){
    let data = {
        name: event.target[0].value,
        age: event.target[1].value,
        description: event.target[2].value,
        
      }
    const num = 1
    fetch( `${URL}` + `/?_limit=50&_page=${num - 1}`,{
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then( renderMonster)
}

document.addEventListener("DOMContentLoaded", function(){
    fetchAllMonsters()
    let monstDiv = document.getElementById("create-monster")
    let form = document.createElement("form")
    let input1 = document.createElement("input")
    let input2 = document.createElement("input")
    let input3 = document.createElement("input")
    let submit = document.createElement("button")
    monstDiv.appendChild(form)
    form.appendChild(input1)
    input1.type = "text-field"
    input1.name = "name"
    input1.placeholder = "Name"
    form.appendChild(input2)
    input2.type = "number"
    input2.name = "Age"
    form.appendChild(input3)
    input3.type = "text-field"
    input3.name = "Description"
    input3.placeholder = "Description"
    form.appendChild(submit)
    submit.type = "submit"
    submit.name = "submit"
    submit.value - "submit"
    submit.innerText = "Create a New Monster"
    document.querySelector("form").addEventListener("submit", submitHandler)
  
})
document.getElementById("forward").addEventListener("click", nextPage)
document.getElementById("back").addEventListener("click", previousPage)

function submitHandler(event){
    event.preventDefault()

    let data = {
        name: event.target[0].value,
        age: event.target[1].value,
        description: event.target[2].value,
        
      }


    fetch( `${URL}` + `/?_limit=50&_page=1`,{
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then( renderMonster)

}

function fetchAllMonsters(num){
    fetch(`${URL}` + `/?_limit=50&_page=${num}`)
    .then(response => response.json())
    .then(monstersArray => {
        monstersArray.forEach( renderMonster)
    })
}


function renderMonster(monster){
    // creating card for each toy 
    let monsterDiv = document.createElement("div")
    document.getElementById("monster-container").appendChild(monsterDiv)
    monsterDiv.id = `monster-${monster.id}`
    // creating h2 for each name
    let monsterName = document.createElement("h2")
    monsterDiv.appendChild(monsterName)
    monsterName.innerText = `${monster.name}`
    let monsterAge = document.createElement("h4")
    monsterDiv.appendChild(monsterAge)
    monsterAge.innerText = `Age: ${monster.age}`
    let monsterDes = document.createElement("p")
    monsterDiv.appendChild(monsterDes)
    monsterDes.innerText = `Bio: ${monster.description}`
}
