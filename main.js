const form = document.querySelector('#form')
let text = document.querySelector('#post');
const url = 'http://localhost:3000/notes/'
const container = document.querySelector('#results')

form.addEventListener("submit", function (event) {
    event.preventDefault();
    
    console.log(text.value)

   fetch(url, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({'title': 'new task', 'body':`${text.value}` })

    })
    .then((response) => {
        return response.json();
    })

    fetch(url, {
        method: 'GET',
        headers: {'Content-Type' : 'application/json'},
        
    })
    .then((response) => {
        return response.json();
    })

    .then((data) => {
        loadObject(data);
    })

});


function loadObject(objects) {
    for (let object of objects) {
      //create card for the customer
      let card = document.createElement('div');
      card.classList.add('card');
      card.classList.add('medium');
  
      //create div for customer name
      let name = document.createElement('div');
      name.classList.add('card-title');
      name.classList.add('h1');
      name.innerText = `${object.title}`;
  
      //add name and card to customer container
  
  
      let body = document.createElement('div');
      body.classList.add('body');
      body.innerText = `${object.body}`;
  
      card.appendChild(name);
      card.appendChild(body);

  
      container.appendChild(card);
    }
  }