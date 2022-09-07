

let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  let createToy = document.querySelector(".submit");
  createToy.parentElement.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/toys", {
      method: "POST",
      body: JSON.stringify({
        "name": e.target.children[1].value,
        "image": e.target.children[3].value,
        "likes": 0
      }),
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
  })

  let toyCollection = document.getElementById("toy-collection");
  fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(obj => {
      for (const el of obj) {
        let toyDiv = document.createElement('div');
        let toyName = document.createElement('h2');
        let toyImg = document.createElement('img');
        let toyLikes = document.createElement('p');
        let likeButton = document.createElement('button');

        toyDiv.classList.add("card");
        toyName.textContent = el.name;
        toyCollection.appendChild(toyDiv);
        toyDiv.appendChild(toyName);

        toyImg.src = el.image;
        toyImg.classList.add("toy-avator");
        toyDiv.appendChild(toyImg);
        toyImg.style.maxWidth= "250px";
        toyLikes.textContent = el.likes + " Likes";
        toyDiv.appendChild(toyLikes);

        likeButton.classList.add("like-btn");
        likeButton.id = el.id;
        likeButton.textContent = "Like ❤️";
        likeButton.addEventListener("click", liked)
        toyDiv.appendChild(likeButton);

      }
    })
});


function liked(e) {
  fetch(`http://localhost:3000/toys/${parseInt(e.target.id)}`)
    .then(resp => resp.json())
    .then(obj => obj.likes)
    .then(likes=>
      fetch(`http://localhost:3000/toys/${e.target.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          "likes": ++likes,
        }),
        headers: {
          "Content-type": "application/json"
        }
      }))
}