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