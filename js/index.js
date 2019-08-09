const forwardBut = document.getElementById('forward')
const backwardBut = document.getElementById('back')
let num = 1
const submitMon = document.querySelector('form')

document.addEventListener("DOMContentLoaded", function(){
     forwardBut.addEventListener("click", nextPage)
      backwardBut.addEventListener("click", backPage)
    showMonster()
    submitMon.addEventListener("submit", newMonster)
})

let container = document.getElementById("monster-container")

function showMonster(){
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${num}`)
    .then(res => res.json())
    .then(monArray => monArray.forEach(getMon))
}

function getMon(mon){
    let monDiv = document.createElement('div')
    container.appendChild(monDiv)

    let monH2 = document.createElement('h2')
    monDiv.appendChild(monH2)
     monH2.innerText = mon.name
let monH5 = document.createElement('h5')
monDiv.appendChild(monH5)
monH5.innerText = `Age: ${mon.age}`
     let monP = document.createElement('p')
     monDiv.appendChild(monP)
     monP.innerText = mon.description
}


function nextPage(){
    container.innerText = " "
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${num+=1}`)
     .then(res => res.json())
     .then(monArray => monArray.forEach(getMon))
}

function backPage(){
    if (num > 1){
    container.innerText = " "
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${num-=1}`)
     .then(res => res.json())
     .then(monArray => monArray.forEach(getMon))
    }
}

function newMonster(e){
    e.preventDefault()
    let data = {
        name: e.target.name.value,
        age: e.target.age.value,
        description:  e.target.description.value
    }
fetch('http://localhost:3000/monsters/',{
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
        'content-type': 'application/JSON'
    }
})
.then(res => res.json())

}