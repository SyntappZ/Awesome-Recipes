// import { getData } from "./recipeData.js";
force.bindHashes();


let cuisineTypeElement = document.querySelector(".cuisine-list");
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
  cuisineTypeElement.innerHTML += `<li>${x}</li>`;
});

//meal type
let mealType = document.querySelector(".meal-list");
["None","Breakfast", "Lunch", "Dinner", "Snack"].forEach(x => {
  mealType.innerHTML += `<li class="meal">${x}</li>`;
});

document.querySelectorAll('.meal').forEach(function(e) {
  e.onclick = function() {
    
   // this.closest('.drop-btns').firstElementChild.style.innerText = 'bob'
  }
})

//dish type

let dishTypeElement = document.querySelector(".dish-list");

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
  dishTypeElement.innerHTML += `<li>${x}</li>`;
});

//diet

let dietTypeElement = document.querySelector(".diet-list");

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
  dietTypeElement.innerHTML += `<li>${x}</li>`;
});

let dropBtns = document.querySelectorAll(".drop-btns");

dropBtns.forEach(function(e) {
 let open = false
  e.onclick = function() {
    open = !open
    

    if(open) {
     this.children[1].firstElementChild.style.transform = "translate(0, 0)";

    }else{
      this.children[1].firstElementChild.style.transform = "translate(0, -100%)";

    }
      

    
  };

 
});

// btn.addEventListener("click", () => {
//   const recipes = getData("fish", cuisineType[2]);
//   recipes
//     .then(data => {
//       console.log(data);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });
