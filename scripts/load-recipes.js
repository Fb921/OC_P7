var xhttp = new XMLHttpRequest();
xhttp.open("GET", "./data/recipes.json", false);
xhttp.send();
const recipes = JSON.parse(xhttp.responseText);

/*Déclaration des variables */
var ingredientKw = [];
var applianceKw = [];
var ustensilKw = [];
var searched_recipes = [];
var search_activated;
var searched_recipes_trash = [];
var filter_activated = 0;


/*Intégration visuelle de la page */
for(let i=0;i<recipes.length;i++){
    let article = document.createElement("article");
    article.setAttribute("id","recipe"+recipes[i].id);
    let recipe_img_container = document.createElement('div');
    recipe_img_container.setAttribute('class','img_container');
    let recipe_info_container = document.createElement('div');
    recipe_info_container.setAttribute('class','recipe-infos_container');
    let shortdesc_container = document.createElement("div");
    shortdesc_container.setAttribute('class','shortdesc');
    let title = document.createElement("h2");
    title.textContent = recipes[i].name;
    let time = document.createElement("div");
    time.setAttribute('class','time_container');
    time.innerHTML = '<i class="far fa-clock"></i> '+recipes[i].time+' min';
    let instruct_container = document.createElement("div");
    instruct_container.setAttribute('class','longdesc');
    let ingredients = document.createElement("div");
    ingredients.setAttribute('class','ingredients-container');
    for(let y = 0;y<recipes[i].ingredients.length;y++){
        let ingredient = document.createElement('div');
        let unit = recipes[i].ingredients[y].unit;
        if(!unit){unit = ""}
        ingredient.innerHTML = "<span class='ingredient_name'>"+recipes[i].ingredients[y].ingredient+"</span>: " +recipes[i].ingredients[y].quantity + unit;
        ingredients.appendChild(ingredient);
        let l = recipes[i].ingredients[y].ingredient.toLowerCase();
        ingredientKw.push(l);
    }
    let howto = document.createElement("div");
    howto.setAttribute('class','instructions-container');
    howto.textContent = recipes[i].description;
    shortdesc_container.appendChild(title);
    shortdesc_container.appendChild(time);
    instruct_container.appendChild(ingredients);
    instruct_container.appendChild(howto);
    recipe_info_container.appendChild(shortdesc_container);
    recipe_info_container.appendChild(instruct_container);
    article.appendChild(recipe_img_container);
    article.appendChild(recipe_info_container);
    document.querySelector('.recettes_container').appendChild(article);
    for(let o = 0;o < recipes[i].ustensils.length; o++){
        let u = recipes[i].ustensils[o].toLowerCase();
        ustensilKw.push(u);}
    let a = recipes[i].appliance.toLowerCase();
    applianceKw.push(a);
    searched_recipes.push(recipes[i]);
}

/*On crée la liste des filtres*/

var iS = new Set(ingredientKw);
var iA = new Set(applianceKw);
var iU = new Set(ustensilKw);

ingredientKw = [...iS];
applianceKw = [...iA];
ustensilKw = [...iU];



/* Insère les filtres dans le blocs des filtres */

for(let i=0;i < ingredientKw.length; i++){
    let kw = document.createElement('div');
    kw.textContent = ingredientKw[i];
    kw.setAttribute("id","ingredient"+i);
    kw.onclick = function(){
      //search1.js 
      addFilter(kw);
      //search2.js
    //   createTag(kw);
    }
    document.querySelector('#ingredient-kw_container').appendChild(kw);
}
for(let i=0;i < applianceKw.length; i++){
    let kw = document.createElement('div');
    kw.textContent = applianceKw[i];
    kw.setAttribute("id","appliance"+i);
    kw.onclick = function(){
        //search1.js 
        addFilter(kw);
        // search2.js
        // createTag(kw);
    }
    document.querySelector('#appliance-kw_container').appendChild(kw);
}
for(let i=0;i < ustensilKw.length; i++){
    let kw = document.createElement('div');
    kw.textContent = ustensilKw[i];
    kw.setAttribute("id","ustensil"+i);
    kw.onclick = function(){
        //search1.js 
        addFilter(kw);
        //search2.js
        // createTag(kw);
    }
    document.querySelector('#ustensil-kw_container').appendChild(kw);
}