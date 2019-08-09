document.addEventListener("DOMContentLoaded", () => {
  const monsterForm = document.getElementById("add-monster-form")
  const monsterContainer = document.getElementById("monster-container")
  const leftArrow = document.getElementById("back")
  const rightArrow = document.getElementById("forward")
  let numMonsters = 0
  let start = 0
  let end = 50

  function fetchMonsters(){
    fetch("http://localhost:3000/monsters")
        .then(resp => resp.json())
        .then(monstersArray => grabFifty(monstersArray))
  }

  function grabFifty(monstersArray){
    numMonsters = monstersArray.length
    console.log(numMonsters)
    monsterContainer.innerHTML = "<div></div>"
    monstersArray.slice(start,end).forEach(renderMonster)
  }

  function renderMonster(monster){
    const monsterDiv = document.getElementById("monster-container")
    const monsterName = document.createElement("h2")
    const monsterAge = document.createElement("h4")
    const monsterDescription = document.createElement("p")
    monsterDiv.appendChild(monsterName)
    monsterDiv.appendChild(monsterAge)
    monsterDiv.appendChild(monsterDescription)
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
