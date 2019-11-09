import { recipeData } from "./recipeData.js";

const searchForm = document.querySelector(".search");
const cuisineTypeElement = document.querySelector(".cuisine-list");
const mealTypeElement = document.querySelector(".meal-list");
const dishTypeElement = document.querySelector(".dish-list");
const dietTypeElement = document.querySelector(".diet-list");
const dropBtns = document.querySelectorAll(".drop-btns");
const recipeCardElements = document.querySelectorAll(".card");
const loadingScreen = document.querySelector(".loading-page");
const resultsCardsWrap = document.querySelector(".result-cards-wrap");
const mealSearchingButtons = document.querySelectorAll(".searching-btns");
const scrollAnchor = document.getElementById('results')




window.onload = event => {
  loadingScreen.style.opacity = "0";
  searchRecipes("chinese");
  setTimeout(() => {
    loadingScreen.style.zIndex = "-10";
  }, 500);
};

recipeCardElements.forEach(card => {
  card.onclick = function() {
    searchRecipes(this.lastElementChild.textContent);
    force.jump(scrollAnchor);
  };
});

force.bindHashes();

let foodOptions = {
  mealType: "",
  cuisineType: "",
  dishType: "",
  diet: ""
};
let recipeDataObject = {};

function mealOptionSelector(foodList, foodType, text) {
  document.querySelectorAll(foodList).forEach(function(e) {
    e.onclick = function() {
      foodOptions[foodType] = `&${foodType}=${this.textContent.toLowerCase()}`;
      if (this.textContent.toLowerCase() === "none") {
        this.closest(".drop-btns").firstElementChild.textContent = text;
      } else {
        this.closest(
          ".drop-btns"
        ).firstElementChild.textContent = this.textContent.toUpperCase();
      }
    };
  });
}

let cuisineList = [
  "None",
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
cuisineList.forEach(x => {
  cuisineTypeElement.innerHTML += `<li class="cuisine">${x}</li>`;
});

mealOptionSelector(".cuisine", "cuisineType", "CUISINE TYPE");

//meal type
["None", "Breakfast", "Lunch", "Dinner", "Snack"].forEach(x => {
  mealTypeElement.innerHTML += `<li class="meal">${x}</li>`;
});

mealOptionSelector(".meal", "mealType", "MEAL TYPE");

//dish type

let dishList = [
  "None",
  "Bread",
  "Cereals",
  "sauces",
  "Drinks",
  "Desserts",
  "Main course",
  "Pancake",
  "Preps",
  "Preserve",
  "Salad",
  "Sandwiches",
  "Side dish",
  "Soup",
  "Starter",
  "Sweets"
];

dishList.forEach(x => {
  dishTypeElement.innerHTML += `<li class="dish">${x}</li>`;
});

mealOptionSelector(".dish", "dishType", "DISH TYPE");

//diet

let dietList = [
  "None",
  "balanced",
  "high-fiber",
  "High-Protein",
  "Low-Carb",
  "Low-Fat",
  "Low-Sodium"
];

dietList.forEach(x => {
  dietTypeElement.innerHTML += `<li class="diet">${x}</li>`;
});

mealOptionSelector(".diet", "diet", "DIET");

dropBtns.forEach(button => {
  let open = false;
  button.onclick = function() {
    open = !open;
    if (open) {
      this.children[1].style.display = "block";
      setTimeout(() => {
        this.children[1].firstElementChild.style.transform = "translate(0, 0)";
      }, 50);
    } else {
      this.children[1].firstElementChild.style.transform =
        "translate(0, -100%)";
      setTimeout(() => {
        this.children[1].style.display = "none";
      }, 500);
    }
  };
});

searchForm.addEventListener("submit", function(e) {
  e.preventDefault();
  searchRecipes(this.firstElementChild.value);
  this.firstElementChild.value = "";
});

function searchRecipes(searchQuery) {
  for (let option in foodOptions) {
    if (/=none/.test(foodOptions[option])) foodOptions[option] = null;
  }

  const recipes = recipeData(searchQuery, foodOptions);

  recipes
    .then(data => {
      if (!data.length) {
        searchRecipes('chinese')
        alert("No Results found!");
      }
      resultCard(data);
    })
    .catch(err => {
      console.log(err);
      alert(err);
    });
}

mealSearchingButtons.forEach(x => {
  x.onclick = function() {
    let splitText = this.textContent.split(' ')
    let query = splitText[splitText.length -1];
    searchRecipes(query)
    force.jump(scrollAnchor);
  }
})

function resultCard(recipes) {
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
    resultsCardsWrap.innerHTML += `
  <div 
  class="recipe-card"
   style="background:url(${image});
   background-size:cover;
    background-position: center center;
    ">
  <div class="cover"></div>
   <div class="source">
   <p>${source}</p>
  
   </div>
  <div class="wrap">
      <div class="text">
          <h2>${title}</h2>
          <h4>calories: ${calories}</h4>
      </div>
      <div class="btn-wrap">
              <div class="info-btn">
                  <p>info</p>
              </div>
          </div>
  </div>
  </div>
  `;
  }
}

// function getId(id) {
//   console.log(id)
// }
