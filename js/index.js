document.addEventListener("DOMContentLoaded", ()=>{
    console.log("hello, is it me you're looking for")
    getMonsters()
    createForm()
    document.querySelector("#monster-form").addEventListener("submit", createNewMonster)
    document.querySelector("#forward").addEventListener("click", pageForward)
    document.querySelector("#back").addEventListener("click", pageBack)
})

let pageCounter = 0

function monsterUrl(){
    return 'http://localhost:3000/monsters?_limit=50&_page='
}

function getMonsters() {
    fetch(monsterUrl() + ++pageCounter)
    .then(resp => resp.json())
    .then(monsters => monsters.forEach(addMonsterToDOM))
}


function addMonsterToDOM(monster){
    const monsterDiv = document.createElement('div')
    monsterDiv.id = "monsters"
    const monsterH2 = document.createElement('h2')
    const monsterH4 = document.createElement('h4')
    const monsterP = document.createElement('p')
    
    document.querySelector('#monster-container').appendChild(monsterDiv)
    
    monsterH2.innerText = monster.name
    monsterH4.innerText = monster.age
    monsterP.innerText = monster.description

    monsterDiv.append(monsterH2, monsterH4, monsterP)
}

function createForm() {
    const newMonsterForm = document.createElement("form")
    newMonsterForm.id = "monster-form"

    const nameInput = document.createElement("input")
    nameInput.id = "name"
    nameInput.placeholder = "name..."

    const ageInput = document.createElement("input")
    ageInput.id = "age"
    ageInput.placeholder = "age..."

    const descInput = document.createElement("input")
    descInput.id = "description"
    descInput.placeholder = "description..."

    const newButton = document.createElement("button")
    newButton.innerHTML = "Create a monster"

    newMonsterForm.append(nameInput, ageInput, descInput, newButton)

    document.querySelector("#create-monster").appendChild(newMonsterForm)
}

function createNewMonster(e) {
    e.preventDefault()
    const newName= e.target["name"].value
    const newAge = e.target["age"].value
    const newDesc = e.target["description"].value

    if (newName === '' || newAge === '' || newDesc === '') {
        alert('Please fill out all form inputs')
      } else {
        const monsterData = {
          name: newName,
          age: newAge,
          description: newDesc
        }
    postNewMonster(monsterData)
    document.getElementById("monster-form").reset()
    }
}

function postNewMonster(monsterData) {
    fetch("http://localhost:3000/monsters/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'accept': "application/json"
        },
        body: JSON.stringify(monsterData)
    })
    .then(res => res.json())
    .then(addMonsterToDOM)
    .catch(()=>alert('Server down! Please add your monster later <3'))
}

function pageForward(event) {
    let elem = document.querySelector("#monster-container")
    let child = elem.lastElementChild;
    console.log(child)
    while (child) {
        elem.removeChild(child);
        child = elem.lastElementChild;
    }
    getMonsters()
}

function pageBack() {
    let elem = document.querySelector("#monster-container")
    let child = elem.lastElementChild;
    console.log(child)
    while (child) {
        elem.removeChild(child);
        child = elem.lastElementChild;
    }
    fetch(monsterUrl() + --pageCounter)
    .then(resp => resp.json())
    .then(monsters => monsters.forEach(addMonsterToDOM))
}

