var xhttp = new XMLHttpRequest();
xhttp.open("GET", "./data/recipes.json", false);
xhttp.send();
const recipes = JSON.parse(xhttp.responseText);
console.log(recipes);

/*Déclaration des variables */
var ingredientKw = [];
var applianceKw = [];
var ustensilKw = [];
var kw_tab = [];
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
        ingredientKw.push(recipes[i].ingredients[y].ingredient);
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
        ustensilKw.push(recipes[i].ustensils[o]);}
    applianceKw.push(recipes[i].appliance);
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
    kw.onclick = function clickOnFilterI(){
        createTag(this);
    };
    document.querySelector('#ingredient-kw_container').appendChild(kw);
}
for(let i=0;i < applianceKw.length; i++){
    let kw = document.createElement('div');
    kw.textContent = applianceKw[i];
    kw.setAttribute("id","appliance"+i);
    kw.onclick = function clickOnFilterA(){
        createTag(this);
    };
    document.querySelector('#appliance-kw_container').appendChild(kw);
}
for(let i=0;i < ustensilKw.length; i++){
    let kw = document.createElement('div');
    kw.textContent = ustensilKw[i];
    kw.setAttribute("id","ustensil"+i);
    kw.onclick = function clickOnFilterU(){
        createTag(this);
    };
    document.querySelector('#ustensil-kw_container').appendChild(kw);
}




/*Fonctions qui permet de créer un tag */

function createTag(e){
    let element = document.createElement('div');
    if(e.id.indexOf("ingredient") > -1){
        element.setAttribute("class","tagElement i-tag");
        let ing = filterWIngredient(e.textContent);
        if(lastIAUFilterResult.length == 0){
            console.log("length is 0");
            lastIAUFilterResult = ing; 
        }else{
            lastIAUFilterResult = getCommonRecipes(ing,lastIAUFilterResult);
        }
        /*On s'assure que ce n'est pas la premiere recherche */
        if(lastFilterResult.length == 0){
            lastFilterResult = ing;
        }else{lastFilterResult = getCommonRecipes(ing,lastFilterResult);}
        displayRecipes(lastFilterResult);
    }
    else if(e.id.indexOf("appliance") > -1){
        element.setAttribute("class","tagElement a-tag");
    }
    else if(e.id.indexOf("ustensil") > -1){
        element.setAttribute("class","tagElement u-tag");
    }
    kw_tab.push(e.textContent);
    element.setAttribute("id","tag-"+e.id);
    element.innerHTML = e.innerHTML + "<i style='margin:0 0 0 10px;cursor:pointer' class=\"far fa-times-circle\" onclick=\"closeFilter(\'tag-"+e.id+"\')\"></i>";
    document.querySelector(".filter-container_tag-container").appendChild(element);
}



/*Fonctions qui permet de fermer un tag */

function closeFilter(id){
    filter_activated--;
    if(filter_activated == 0){
        let index = allIAUFilterResultIndex[document.querySelector("#"+id).textContent];
        delete(allIAUFilterResultIndex[document.querySelector("#"+id).textContent]);
        allIAUFilterResult.splice(index,1);
        if(mainbarFilterResult.length == 0){
            lastFilterResult = recipes;
        }else{lastFilterResult = mainbarFilterResult;}
        displayRecipes(lastFilterResult);
    }else{
        let index = allIAUFilterResultIndex[document.querySelector("#"+id).textContent];
        delete(allIAUFilterResultIndex[document.querySelector("#"+id).textContent]);
        allIAUFilterResult.splice(index,1);
        let filters = filterCommonRecipes(allIAUFilterResult);
        if(mainbarFilterResult.length == 0){
            lastFilterResult = filters;
        }else{
            lastFilterResult = getCommonRecipes(mainbarFilterResult,filters);
        }
        displayRecipes(lastFilterResult);
    }
    document.querySelector("#"+id).remove();
}