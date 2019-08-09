document.addEventListener("DOMContentLoaded", ()=>{
    console.log("hello, is it me you're looking for")
    getMonsters()
    createForm()
    document.querySelector("#monster-form").addEventListener("submit", createNewMonster)

})

function getMonsters() {
    fetch("http://localhost:3000/monsters?_limit=50&_page=1")
    .then(resp => resp.json())
    .then(monsters => monsters.forEach(renderMonster))
}

function renderMonster(monster){
    const monsterDiv = document.createElement('div')
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
    if (newName === '' || newAge === '') {
        alert('Please fill out both name and image')
      } else {
        const data = {
          name: e.target['name'].value,
          age: e.target['age'].value,
          likes: 0
        }
}

function postNewMonster() {

}

