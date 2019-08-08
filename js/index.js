let page = 1;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#new-monster-form');
  form.addEventListener('submit', createNewMonster);

  document.querySelector('#forward').addEventListener('click', nextPage);
  document.querySelector('#back').addEventListener('click', prevPage);

  //load the monsters
  fetch(`http://localhost:3000/monsters?_page=${page}&_limit=50`)
    .then(res => res.json())
    .then(monsters => monsters.forEach(renderMonster));
});

function nextPage() {
  page += 1;
  document.querySelector('#monster-container').innerHTML = '';
  fetch(`http://localhost:3000/monsters?_page=${page}&_limit=50`)
    .then(res => res.json())
    .then(monsters => monsters.forEach(renderMonster));
}

function prevPage() {
  page -= 1;
  document.querySelector('#monster-container').innerHTML = '';
  fetch(`http://localhost:3000/monsters?_page=${page}&_limit=50`)
    .then(res => res.json())
    .then(monsters => monsters.forEach(renderMonster));
}

function renderMonster(monster) {
  const monsterContainer = document.querySelector('#monster-container');
  const monsterEl = document.createElement('div');
  monsterEl.innerHTML = `
    <h1>${monster.name}</h1>
    <p>${monster.description}</p>
  `;
  monsterContainer.appendChild(monsterEl);
}

function createNewMonster(e) {
  e.preventDefault();
  monsterName = e.target[0].value;
  monsterAge = e.target[1].value;
  monsterDescription = e.target[2].value;
  // make a fetch call to the db to persist monster
  fetch('http://localhost:3000/monsters', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      name: monsterName,
      age: monsterAge,
      description: monsterDescription,
    }),
  });
}
