const btn = document.getElementById("search-button");
const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const result = document.getElementById("result");

btn.addEventListener('click', () => {
  let userInp = document.getElementById("user-input").value;
  if (userInp.length == 0) {
    result.innerHTML = `<h2>Input Field Cannot Be Empty</h2>`;
  }else{

      fetch(url + userInp)
        .then((response) => response.json())
        .then((data) => {
          if (data.meals && data.meals.length > 0) {
            let myMeal = data.meals[0];
            console.log(myMeal);
            console.log(myMeal.strMealThumb);
            console.log(myMeal.strMeal);
            console.log(myMeal.strArea);
            console.log(myMeal.strInstructions);
            let count = 1;
            let ingredients = [];
            let measurements = [];
            for (let i = 1; i <= 20; i++) {
              let ingredient = myMeal[`strIngredient${i}`];
              let measure = myMeal[`strMeasure${i}`];
              if (ingredient) {
                ingredients.push(`${ingredient}`);
                if (measure) {
                  measurements.push(`${measure}`);
                } else {
                  measurements.push("");
                }
              }
            }
            console.log(ingredients);
    
            // Split instructions into individual steps
            let instructions = myMeal.strInstructions.split("\r\n");
    
            // Render the result
            result.innerHTML = `
              <h1 class="food-category">Food Category: ${myMeal.strCategory}</h1>
              <h2 class="food-area">Food Area: ${myMeal.strArea}</h2>
              <h2 class="food-name">Food Name: ${myMeal.strMeal}</h2>
              <div class="row">
                <div class="col1">
                  <img src="${myMeal.strMealThumb}" alt="">
                </div>
                <div class="col2">
                  <h2 class="text-left">Ingredients:</h2>
                  <ul>
                    ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                  </ul>
                </div>
                <div class="col3">
                  <h2 class="text-left">Measurements:</h2>
                  <ul>
                    ${measurements.map(measure => `<li>${measure}</li>`).join('')}
                  </ul>
                </div>
              </div>
              <div class="instructions">
                <h2>Instructions:</h2>
                <ol>
                  ${instructions.map(step => `<li>${step}</li>`).join('')}
                </ol>
              </div>
              <div class="video">
                <h2>Watch Full Video On <a class="red"> Youtube </a></h2>
                <iframe src="https://youtube.com/embed/${myMeal.strYoutube.slice(-11,)}" frameborder = "0" width="70%" height="500"></iframe>
              </div>
            `;
          } else {
            result.innerHTML = `<h2>No meal found.</h2>`;
          }
        })
        .catch((error) => {
          console.log(error);
          result.innerHTML = `<h2>An Error Occur</h2>`;
        });
  }
});
