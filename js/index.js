MONSTERS_URL = "http://localhost:3000/monsters"
const monsterContainer = document.getElementById('monster-container')
const newMonsterDiv = document.getElementById('create-monster')
document.addEventListener('DOMContentLoaded', function(event){
    getMonsters(event)
    monsterForm(event)
    let form = document.getElementById('monster-form')
    form.addEventListener('submit', function(e){
        e.preventDefault()
        let name = e.target[0].value
        let age = parseInt(e.target[1].value)
        let description = e.target[2].value
        let monsterObj = {name: name, age: age, description: description}
        
        postMonster(monsterObj)

    })
    


})

function getMonsters(event){

    fetch(MONSTERS_URL)
        .then(r => r.json())
        .then(monsters => {
            let firstFifty = monsters.slice(0, 50);
            firstFifty.forEach(renderMonsters)
        })

}

function renderMonsters(monsterObj){
    let monsterDiv = document.createElement('div')
        monsterDiv.dataset.id = monsterObj.id
        monsterDiv.id = `monster-${monsterObj.id}`
    let hName = document.createElement('h3')
        hName.innerText = monsterObj.name
    let hAge = document.createElement('h5')
        hAge.innerText = monsterObj.age
    let descrip = document.createElement('p')
        descrip.innerText = monsterObj.description

    monsterDiv.appendChild(hName)
    monsterDiv.appendChild(hAge)
    monsterDiv.appendChild(descrip)

    monsterContainer.appendChild(monsterDiv)    
}

function monsterForm(event){
    let form = document.createElement('form')
        form.id = "monster-form"

    let nameInput = document.createElement('input')
        nameInput.type = "text"
        nameInput.name = "Name"
        nameInput.placeholder = "Monster Name"
    let ageInput = document.createElement('input')
        ageInput.type = "number"
        ageInput.name = "Age"
        ageInput.placeholder = "Age"
    let description = document.createElement('input')
        description.type = "text"
        description.name = "Name"
        description.placeholder = "Description"
    let submit = document.createElement('input')
        submit.type = "Submit"


    form.appendChild(nameInput)
    form.appendChild(ageInput)
    form.appendChild(description)
    form.appendChild(submit)
    //form event listener 
    
    newMonsterDiv.appendChild(form)
    
}

function postMonster(monster){
    
    fetch(MONSTERS_URL, {
        method: "POST",
        headers: {"Content-Type":"application/json", "Accept": "application/json"},
        body: JSON.stringify(monster)
    })
    
    
}


