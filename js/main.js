import { recipeData } from "./recipeData.js";

const searchForm = document.querySelector(".search");


const recipeCardElements = document.querySelectorAll(".card");
const loadingScreen = document.querySelector(".loading-page");
const resultsCardsWrap = document.querySelector(".result-cards-wrap");

const mealSearchingButtons = document.querySelectorAll(".searching-btns");
const scrollAnchor = document.getElementById("results");


let cuisineList = [
  "American",
  "Asian",
  "British",
  "Caribbean",
  "Central Europe",
  "Chinese",
  "Eastern Europe",
  "French",
  "Indian",
  "Italian",
  "Japanese",
  "Kosher",
  "Mediterranean",
  "Mexican",
  "Middle Eastern",
  "Nordic",
  "South American",
  "South East Asian"
];

let todaysSearchQuery =
  cuisineList[Math.floor(Math.random() * cuisineList.length)];

document.addEventListener("DOMContentLoaded", function() {
  searchRecipes(todaysSearchQuery);
  setTimeout(() => {
    loadingScreen.style.opacity = "0";
    loadingScreen.style.zIndex = "-10";
  }, 500);
});

recipeCardElements.forEach(card => {
  card.onclick = function() {
    searchRecipes(this.lastElementChild.textContent);
    force.jump(scrollAnchor);
  };
});

force.bindHashes();

searchForm.addEventListener("submit", function(e) {
  e.preventDefault();
  searchRecipes(this.firstElementChild.value);
  this.firstElementChild.value = "";
});

const searchRecipes = searchQuery => {
  const recipes = recipeData(searchQuery);

  recipes
    .then(data => {
      if (!data.length) {
        searchRecipes("chinese");
        alert("No Results found!");
      }
      resultCard(data);
    })
    .catch(err => {
      console.log(err);
      alert(err);
    });
};

mealSearchingButtons.forEach(x => {
  x.onclick = function() {
    let splitText = this.textContent.split(" ");
    let query = splitText[splitText.length - 1];
    searchRecipes(query);
    force.jump(scrollAnchor);
  };
});

const resultCard = recipes => {
  resultsCardsWrap.innerHTML = "";

  for (let i = 0; i < recipes.length; i++) {
    let title = recipes[i].label;
    let arr = title.split(/ |-/g);
    if (arr.length > 3) {
      arr.length = 3;
      title = arr.join(" ") + "...";
    }
    let image = recipes[i].image;
    let source = recipes[i].source;
    let calories = recipes[i].calories.toString().match(/\d+/)[0];
    let url = recipes[i].url
    resultsCardsWrap.innerHTML += `
   
  <div 
  class="recipe-card"
  
   style="background:url(${image});
   background-size:cover;
    background-position: center center;
    ">
    <a href="${url}" target="_">
  <div class="cover"></div>
   <div class="source">
   <p>${source}</p>
  
   </div>
  <div class="wrap">
      <div class="text">
          <h2>${title}</h2>
          <h4>calories: ${calories}</h4>
      </div>
      <div class="logo-wrap">
              <div class="info">
                  <p>A<span>R</span></p>
              </div>
          </div>
  </div>
  </a>
  </div>
  
  `;
  }
};
