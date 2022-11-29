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
   container.replaceChildren();
    for (let object of objects) {
      //create card for the customer
      let card = document.createElement('div');
      card.classList.add('card');
    
  
      //create div for customer name
      let name = document.createElement('div');
      name.classList.add('card-title');
      name.classList.add('h1');
      name.innerText = `${object.title}`;
  
      //add name and card to customer container
  
  
      let body = document.createElement('div');
      body.classList.add('body');
      body.innerText = `${object.body}`;
      
      let id  = document.createElement('div');
      id.classList.add('id');
      id.innerText = `${object.id}`

      let del = document.createElement('a');
      del.id  = id.innerText
      
      del.classList.add('btn-floating', 'btn-small', 'waves-effect', 'waves-light', 'red', 'del')
      del.innerText = 'X'
      

    
   
     
    
   /* let className;
    if (obj.completed){
        className = "completed"
    } else {
        className = "incomplete"
    };
      body.innerHTML=`
        <h2 class=${className}>${object.title}</h2>
        <p>${object.body}</p>
      `*/
      card.appendChild(del);
      card.appendChild(name);
      card.appendChild(id);
      card.appendChild(body);

  
      container.appendChild(card);
      
    }
  }


  container.addEventListener('click',function (event) {
   // console.log(event.target)
  
    if (event.target.classList.contains('del')) {
        console.log('success')
       //console.log(event.target.id)
        fetch(url + `${event.target.id}`, {
            method: 'DELETE',
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
    }
})