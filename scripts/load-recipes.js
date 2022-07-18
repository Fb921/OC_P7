var xhttp = new XMLHttpRequest();
xhttp.open("GET", "./data/recipes.json", false);
xhttp.send();
const recipes = JSON.parse(xhttp.responseText);

console.log(recipes);

