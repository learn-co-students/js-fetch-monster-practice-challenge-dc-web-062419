document.addEventListener("DOMContentLoaded", () => {

  const monsterContainer = document.getElementById("monster-container")
  const createMonsterDiv = document.getElementById("create-monster")
  const monsterForm = document.createElement("form")
  monsterForm.id = "add-monster-form"
  createMonsterDiv.appendChild(monsterForm)

  const nameField = document.createElement("input")
  nameField.id = "name"
  nameField.placeholder = "name..."
  const ageField = document.createElement("input")
  ageField.id = "age"
  ageField.placeholder = "age..."
  const descriptionField = document.createElement("input")
  descriptionField.id = "description"
  descriptionField.placeholder = "description..."
  const submitBttn = document.createElement("button")
  submitBttn.innerText = "Create"
  monsterForm.appendChild(nameField)
  monsterForm.appendChild(ageField)
  monsterForm.appendChild(descriptionField)
  monsterForm.appendChild(submitBttn)

  const leftArrow = document.getElementById("back")
  const rightArrow = document.getElementById("forward")
  let numMonsters
  let start = 0
  let end = 50

  function fetchMonsters(){
    fetch("http://localhost:3000/monsters")
        .then(resp => resp.json())
        .then(monstersArray => grabFifty(monstersArray))
  }

  function grabFifty(monstersArray){
    numMonsters = monstersArray.length
    monsterContainer.innerHTML = "<div></div>"
    monstersArray.slice(start,end).forEach(renderMonster)
  }

  function renderMonster(monster){
    const monsterName = document.createElement("h2")
    const monsterAge = document.createElement("h4")
    const monsterDescription = document.createElement("p")
    monsterContainer.appendChild(monsterName)
    monsterContainer.appendChild(monsterAge)
    monsterContainer.appendChild(monsterDescription)
    monsterName.innerText = monster.name
    monsterAge.innerText = monster.age
    monsterDescription.innerText = monster.description
  }

  fetchMonsters()

  monsterForm.addEventListener("submit", (e) => {
    e.preventDefault()
    let data = {
      name: e.target[0].value,
      age: e.target[1].value,
      description: e.target[2].value
    }

    fetch("http://localhost:3000/monsters", {
      method: "POST",
      headers: {"Content-Type": "application/json",
                Accept: "application/json"},
      body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(renderMonster(data))
  })

  leftArrow.addEventListener("click", (e) => {
    if (start >= 50) {
      start -= 50
      end -= 50
    } else {
      start = 0
      end = 50
    }
    fetchMonsters()
  })

  rightArrow.addEventListener("click", (e) => {
    if (end <= numMonsters-50){
      start += 50
      end += 50
    } else {
      start = numMonsters-50
      end = numMonsters
    }
    fetchMonsters()
  })
})
