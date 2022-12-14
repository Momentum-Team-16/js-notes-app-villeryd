const form = document.querySelector('#form')
let text = document.querySelector('#task');
let category = document.querySelector('#category');
const url = 'http://localhost:3000/notes/'
const container = document.querySelector('#results')


pageLoad();

form.addEventListener("submit", function (event) {
    event.preventDefault();
    
    console.log(text.value)
    if (text.value !== '' && category.value !== ''){
   fetch(url, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({'title': `${category.value}`, 'body':`${text.value}` })

    })
    .then((response) => {
        return response.json();
    })
    pageLoad();
   
}

});


function loadObject(objects) {
   container.replaceChildren();
    for (let object of objects) {
      //create card for the customer
      let card = document.createElement('div');
      card.classList.add('card', 'col', 's6');
    
      let id  = document.createElement('div');
      id.classList.add('id');
      id.innerText = `${object.id}`
      //create div for customer name
      let name = document.createElement('div');
      name.classList.add('card-title');
      name.innerText = `${object.title}`;
      name.id = id.innerText;
  
      //add name and card to customer container
  
  
      let body = document.createElement('div');
      body.classList.add('body');
      body.innerText = `${object.body}`;
      body.id = id.innerText;
      
      

      let del = document.createElement('a');
      del.id  = id.innerText;
      
      del.classList.add('btn-floating', 'btn-small', 'waves-effect', 'waves-light', 'white', 'del', 'right')
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
      card.appendChild(id);
      card.appendChild(name);
      card.appendChild(body);

  
      container.appendChild(card);


    editTask(body);
    editTitle(name);
      
    }
  }

// create delete button
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

function pageLoad() {
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

function editTask(content) {
    content.addEventListener('dblclick', function (event) {
        content.contentEditable = true;
        content.addEventListener('blur', function (event) {
            console.log(content.innerText);
            console.log(url + `${content.id}`);
            content.contentEditable = false;
            fetch(url + `${content.id}`, {
                method: 'PATCH',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({'body':`${content.innerText}` })
                
            })
        .then((response) => {
                return response.json();
            })
        
        })
        
      })
}

function editTitle(content) {
    content.addEventListener('dblclick', function (event) {
        content.contentEditable = true;
        content.addEventListener('blur', function (event) {
            console.log(content.innerText);
            console.log(url + `${content.id}`);
            content.contentEditable = false;
            fetch(url + `${content.id}`, {
                method: 'PATCH',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({'title': `${content.innerText}` })
                
            })
            .then((response) => {
                return response.json();
            })
        
        })
        
      })
}