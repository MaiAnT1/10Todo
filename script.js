const inputBox = document.getElementById("inputbox");
const list = document.getElementById("listcontainer");
var dataApi = "http://localhost:3000/todos"

async function fetchData() {
    let response = await 
    fetch(dataApi);
    let data = await response.json();


    data.forEach(data => {
        console.log('getData: ', data);
        const divItem = document.createElement('li');
        divItem.setAttribute ('id', data.id);
        divItem.innerText = data.description;       
        listcontainer.appendChild(divItem);

        const span = document.createElement("span");
        span.classList.add("delete");
        span.innerHTML = "\u00d7";
        divItem.appendChild(span);
        return divItem;

    });
}
fetchData(); 

function add() {
    var description = document.getElementById("inputbox").value;
    var formData = {
        description: description
    }
    createCourse(formData)
}

function createCourse(data, callback) {
    var options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        body: JSON.stringify(data)

    };
    fetch('http://localhost:3000/todos', options)
        .then(function(response) {
            response.json();
        })
        .then(callback);

}

list.addEventListener("click", function(e){
    if(e.target.classList.contains("delete") ){
        const dataId = e.target.parentElement.getAttribute("id");
        fetch(dataApi + dataId, {
            method: "DELETE",
        })
        .then(function() {
            e.target.parentElement.remove();
        })
        .catch(function(){
            console.log("Error");
        });
    }
});



function updatedescription(id, newData) {
    fetch(dataApi + dataId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.log("Error");
      });
  }