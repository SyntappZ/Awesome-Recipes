const appId = "9e0bbef9";
const apiKey = "c5dd2685a248b7b11037ca81bf677521";

export function recipeData(searchQuery) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(
      "GET",
      `https://api.edamam.com/search?q=${searchQuery}&app_id=${appId}&app_key=${apiKey}&to=16`,
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

    xhr.onerror = function(err) {
      reject("To many api requests! only 5 per minute allowed");
    };

    xhr.send();
  });
}
