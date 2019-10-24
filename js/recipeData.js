const appId = "app_id=9e0bbef9";
const apiKey = "app_key=c5dd2685a248b7b11037ca81bf677521";


export function getData(searchQuery, cuisineType) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
  
      xhr.open(
        "GET",
        `https://api.edamam.com/search?Health=gluten-free&q=${searchQuery}&${appId}&${apiKey}&CuisineType=${cuisineType}`,
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
        reject("ERROR! ", err);
      };
  
      xhr.send();
    });
  }
  