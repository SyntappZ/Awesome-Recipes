import { recipeData } from "./recipeData.js";

const searchForm = document.querySelector(".search");

const caloriesElement = document.querySelector(".calorie-list");
const healthElement = document.querySelector(".health-list");
const dietTypeElement = document.querySelector(".diet-list");
const dropBtns = document.querySelectorAll(".drop-btns");
const recipeCardElements = document.querySelectorAll(".card");
const loadingScreen = document.querySelector(".loading-page");
const resultsCardsWrap = document.querySelector(".result-cards-wrap");

const mealSearchingButtons = document.querySelectorAll(".searching-btns");
const scrollAnchor = document.getElementById("results");
const scrollRecipeDetails = document.getElementById("recipe-details");
const sectionWrap = document.querySelector(".sections");

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

let todaysSearchQuery = cuisineList[Math.floor(Math.random() * cuisineList.length)];

window.onload = event => {
  sectionWrap.style.display = "block";
  loadingScreen.style.opacity = "0";
  //searchRecipes(todaysSearchQuery);

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
  calories: '',
  health: "",
  diet: ""
};

const mealOptionSelector = (foodList, foodType, text) => {
  document.querySelectorAll(foodList).forEach(function(e) {
    e.onclick = function() {
      foodOptions[
        foodType
      ] = `&${foodType}=${this.textContent.toLowerCase()}`;
      if (this.textContent.toLowerCase() === "none") {
        this.closest(".drop-btns").firstElementChild.textContent = text;
     
      } else {
        console.log(this.textContent)
        this.closest(
          ".drop-btns"
        ).firstElementChild.textContent = this.textContent.toUpperCase();
       
      }
    };
  });
};





//calories

['none', "0-300", "300-500", "500-800", "800-1200", "1200-5000"].forEach(label => {
  caloriesElement.innerHTML += `<li class="calories">${label}</li>`;
});

mealOptionSelector(".calories", "Calories", "CALORIES");

//health

let healthLabels = [
  'none',
  "alcohol-free",
  "celery-free",
  "crustcean-free",
  "dairy-free",
  "egg-free",
  "fish-free",
  "gluten-free",
  "keto-friendly",
  "No-sugar",
  "peanut-free",
  "pork-free",
  "meat-free",
  "sesame-free",
  "shellfish-free",
  "soy-free"
];

healthLabels.forEach(label => {
  healthElement.innerHTML += `<li class="health">${label}</li>`;
});

mealOptionSelector(".health", "Health", "HEALTH");

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

dietList.forEach(diet => {
  dietTypeElement.innerHTML += `<li class="diet">${diet}</li>`;
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

const searchRecipes = searchQuery => {
  for (let option in foodOptions) {
    if (/=none/.test(foodOptions[option])) foodOptions[option] = '';
  }

  const recipes = recipeData(searchQuery, foodOptions);

  recipes
    .then(data => {
      if (!data.length) {
        //searchRecipes('chinese');
        alert("No Results found!");
      }
      resultCard(data, getCardInformation);
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

const resultCard = (recipes, callback) => {
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
      <div class="logo-wrap">
              <div class="info">
                  <p>A<span>R</span></p>
              </div>
          </div>
  </div>
  </div>
  `;
  }
  callback(recipes);
};

const getCardInformation = recipes => {
  const resultCards = document.querySelectorAll(".recipe-card");
  resultCards.forEach((card, index) => {
    card.onclick = function() {
      console.log(recipes[index]);
      force.jump(scrollRecipeDetails);
    };
  });
};

const recipeDetailsLayout = () => {};
