const appId = "app_id=9e0bbef9";
const apiKey = "app_key=c5dd2685a248b7b11037ca81bf677521";

export function recipeData(searchQuery, foodOptions) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    let cuisineType = foodOptions.cuisineType;
    let mealType = foodOptions.mealType;
    let dishType = foodOptions.dishType;
    let dietType = foodOptions.diet;


    xhr.open(
      "GET",
      `https://api.edamam.com/search?q=${searchQuery}&to=16&app_id=${appId}&app_key=${apiKey}${cuisineType}${mealType}${dishType}${dietType}`,
      true
    );
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");

    xhr.onload = function() {
      if (this.status == 200) {

        let data = JSON.parse(this.responseText);
        let recipes = data.hits.map(hit => hit.recipe);
        resolve(recipes);
      }
    };

    xhr.onerror = function() {
      reject('Woops, there was an error making the request.');
      
    };

    xhr.send();
  });
}
