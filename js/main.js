// import { getData } from "./recipeData.js";
force.bindHashes();

let cuisineTypeElement = document.querySelector(".cuisine-list");
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
cuisineList.forEach(x => {
  cuisineTypeElement.innerHTML += `<li>${x}</li>`;
});

//meal type
let mealType = document.querySelector(".meal-list");
["Breakfast", "Lunch", "Dinner", "Snack"].forEach(x => {
  mealType.innerHTML += `<li onclick="getMeal(${x})">${x}</li>`;
});

function getMeal(meal) {
  console.log(meal)
}

//dish type

let dishTypeElement = document.querySelector(".dish-list");

let dishList = [
  'Bread',
	'Cereals',
	'sauces',
	'Drinks',
	'Desserts',
	'Main course',
	'Pancake',
	'Preps',
	'Preserve',
	'Salad',
	'Sandwiches',
	'Side dish',
	'Soup',
	'Starter',
	'Sweets',
];

dishList.forEach(x => {
  dishTypeElement.innerHTML += `<li>${x}</li>`;
});

//diet

let dietTypeElement = document.querySelector(".diet-list");


let dietList = [
 	'balanced',	
	'high-fiber',
	'High-Protein',
	'Low-Carb',
	'Low-Fat',
	'Low-Sodium',
];

dietList.forEach(x => {
  dietTypeElement.innerHTML += `<li>${x}</li>`;
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
