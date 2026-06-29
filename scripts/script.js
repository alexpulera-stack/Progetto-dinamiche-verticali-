const search = document.getElementById("search");

if(search){

search.addEventListener("keyup", () => {

const value = search.value.toLowerCase();

document.querySelectorAll(".course-card").forEach(card => {

card.style.display = card.innerText.toLowerCase().includes(value) ? "block" : "none";

});

});

}

const buttons = document.querySelectorAll(".filter-btn");

buttons.forEach(button => {

button.addEventListener("click", () => {

const filter = button.dataset.filter;

document.querySelectorAll(".course-card").forEach(card => {

if(filter === "all"){
card.style.display = "block";
} else {
if(card.classList.contains(filter)){
card.style.display = "block";
} else {
card.style.display = "none";
}
}

});

});

});


function navBar(){
    return document.querySelector("body").innerHTML=`<nav class="navbar">
      <div class="container">
        <img src="../img/logo.png" class="logo" alt="Dinamiche Verticali" />
        <ul class="nav-links">
          <li><a href="home.html">Home</a></li>
          <li><a href="formazione.html">Formazione</a></li>
          <li><a href="contatti.html">Contatti</a></li>
          <li><a href="blog.html">Blog</a></li>
        </ul>
      </div>
    </nav>`
}