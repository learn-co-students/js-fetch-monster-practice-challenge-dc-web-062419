let url = 'http://localhost:3000/monsters'
let currentPage = 19


loadForm()

fetchMonsters()

let forward = document.getElementById('forward')

forward.addEventListener("click", fowardButton)

function fowardButton(e){
    e.preventDefault()
        
        currentPage++
        let monsterContainer = document.getElementById('monster-container')
        // monsterContainer.innerText = " "
        let x = monsterContainer.querySelectorAll('div')
        // debugger
        x.forEach(monster => {
            // debugger
          monster.innerText = " "
        })
        fetchMonsters()
}
let backward = document.getElementById('back')

backward.addEventListener("click", backButton)

function backButton(e){
    e.preventDefault()
    // debugger
    if (currentPage == 1){
        alert("There are no Monstrs here")
    }
    else{
        
        currentPage--
        let monsterContainer = document.getElementById('monster-container')
        // monsterContainer.innerText = " "
        let x = monsterContainer.querySelectorAll('div')
        // debugger
        x.forEach(monster => {
          monster.innerText = " "
        })
        fetchMonsters()
    }
}




// function newMonsters(){
//     let x = monsterContainer.querySelectorAll('div')
//     x.forEach
//     fetch 
// }





function loadForm(){
    let createMonster = document.getElementById('create-monster')
    let form = document.createElement('form')
    let formButton = document.createElement('button')
    formButton.innerText = "Create"
    createMonster.appendChild(form)
    let nameInput = document.createElement('input')
    nameInput.id = "name"
    nameInput.placeholder = 'name...'
    form.appendChild(nameInput)
    let ageInput = document.createElement('input')
    ageInput.id = "age"
    ageInput.placeholder = 'age...'
    form.appendChild(ageInput)
    let descriptionInput = document.createElement('input')
    descriptionInput.id = "description"
    descriptionInput.placeholder = 'description...'
    form.appendChild(descriptionInput)
    form.appendChild(formButton)
    form.addEventListener("submit", handleForm)
}

function handleForm(e){
    e.preventDefault()
    let data = {
        name: event.target["name"].value,
        age: event.target["age"].value,
        description: event.target["description"].value
    }
    fetch(url, {
        method: 'POST',
        headers: { "Content-Type": "application/json", 
                "Accept": "application/json"
     },
    body: JSON.stringify(data)
})
.then(res => res.json())
.then(showMonsters)
}





function showMonsters(res){
    // debugger
    let monsterContainer = document.getElementById('monster-container')
    let monsterDiv = document.createElement('div')
    monsterContainer.appendChild(monsterDiv)
    let nameHeader = document.createElement('h2')
    nameHeader.innerText = res.name
    monsterDiv.appendChild(nameHeader)
    let ageHeader = document.createElement('h4')
    ageHeader.innerText = `Age: ${res.age}`
    monsterDiv.appendChild(ageHeader)
    let bioSection = document.createElement('p')
    bioSection.innerText = `Bio: ${res.description}`
    monsterDiv.appendChild(bioSection)


}

function fetchMonsters(){
    let monsterContainer = document.getElementById('monster-container')
    fetch(`${url}?_limit=50&_page=${currentPage}`)
    .then(res => res.json())
    .then(res =>{
         res.forEach(res => showMonsters(res))})
}