var lastIntersection = [...recipes];
var lastFilterIntersection  = [...recipes];
var allFilterSearch = [];
var allFilterSearchIndex = [];
var allFilterSearchContent = [];
var mainbarSearchResult = [...recipes];
var ingredientTab=[], applianceTab=[], ustensilTab=[];

function searchWithMainbar(word){
    let w = word.toLowerCase();
    mainbarSearchResult = [];
    for(let i=0;i<recipes.length;i++){
        let inIngredient = false;
        for(let y = 0;y< recipes[i].ingredients.length;y++){
            if(recipes[i].ingredients[y].ingredient.toLowerCase().indexOf(w) > -1){inIngredient = true;}
        }
        if((recipes[i].name.toLowerCase().indexOf(w) > -1) || inIngredient || (recipes[i].description.toLowerCase().indexOf(w) > -1)){
            mainbarSearchResult[i] = recipes[i];
        }
    }
    return mainbarSearchResult;
}

function filterByIngredient(word){
    let w = word.toLowerCase();
    let filtered_recipes = [];
    for(let i=0;i<recipes.length;i++){
        let inIngredient = false;
        for(let y = 0;y<recipes[i].ingredients.length;y++){
            if(recipes[i].ingredients[y].ingredient.toLowerCase().indexOf(w) > -1){
                inIngredient = true;
            }
        }
        if(inIngredient){filtered_recipes.push(recipes[i]);}
    }
    let index = allFilterSearch.length;
    allFilterSearch[index] = filtered_recipes;
    allFilterSearchIndex[w] = index;
    allFilterSearchContent[index] = w;
    return filtered_recipes;
}

function filterByAppliance(word){
    let w = word.toLowerCase();
    let filtered_recipes = [];
    for(let i=0;i<recipes.length;i++){
        if(recipes[i].appliance.toLowerCase().indexOf(w) > -1){
            filtered_recipes.push(recipes[i]);            
        }
    }
    let index = allFilterSearch.length;
    allFilterSearch[index] = filtered_recipes;
    allFilterSearchIndex[w] = index;
    allFilterSearchContent[index] = w;
    return filtered_recipes;
}

function filterByUstensil(word){
    let w = word.toLowerCase();
    let filtered_recipes = [];
    for(let i=0;i<recipes.length;i++){
        let inUstensil = false;
        for(let y = 0;y<recipes[i].ustensils.length;y++){
            if(recipes[i].ustensils[y].toLowerCase().indexOf(w) > -1){
                inUstensil= true;}
        }if(inUstensil){filtered_recipes.push(recipes[i])}
    }
    let index = allFilterSearch.length;
    allFilterSearch[index] = filtered_recipes;
    allFilterSearchIndex[w] = index;
    allFilterSearchContent[index] = w;
    return filtered_recipes;
}

function displayRecipes(t){
    for(let i=0;i<recipes.length;i++){
        if(t.includes(recipes[i])){
            document.querySelector('#recipe'+recipes[i].id).style.cssText = " ";
        }else{
            document.querySelector('#recipe'+recipes[i].id).style.cssText = "display:none";
        }
    }
}

function getRecipesIntersection(t1,t2){
    let recipesIntersection = [];
    for(let i=0;i<t1.length;i++){
        if(t2.includes(t1[i])){recipesIntersection[i] = t1[i];}
    }return recipesIntersection;
}

function getAllFiltersIntersection(){
    let filterIntersection = [];
    if(allFilterSearch.length > 0){
        filterIntersection = allFilterSearch[0];
        for(let i=1;i<allFilterSearch.length;i++){
            filterIntersection = getRecipesIntersection(filterIntersection,allFilterSearch[i]);
        }
    }else{
        filterIntersection = [...recipes];
    }return filterIntersection;
}

function getIntersectionOfAll(){
    let intersectionOfAll = [];
    if(allFilterSearch.length > 0){
        let filterIntersection = getAllFiltersIntersection();
        intersectionOfAll = getRecipesIntersection(mainbarSearchResult,filterIntersection);
    }else{
        intersectionOfAll = mainbarSearchResult;
    }return intersectionOfAll;
}

function createTag(e){
    let newFilterResult=[];
    let newTag = document.createElement('div');
    // let id = e.id.toLowerCase();
    let content = e.textContent.toLowerCase();
    if(e.id.indexOf("ingredient") > -1){
        newTag.setAttribute("class","filter_tag ingredient_tag");
        newFilterResult = filterByIngredient(e.textContent);
    }
    else if(e.id.indexOf("appliance") > -1){
        newTag.setAttribute("class","filter_tag appliance_tag");
        newFilterResult = filterByAppliance(e.textContent);
    }else{
        newTag.setAttribute("class","filter_tag ustensil_tag");
        newFilterResult = filterByUstensil(e.textContent);
    }
    lastFilterIntersection = getRecipesIntersection(newFilterResult,lastFilterIntersection);
    lastIntersection = getRecipesIntersection(mainbarSearchResult,lastFilterIntersection);
    displayRecipes(lastIntersection);
    newTag.setAttribute("id","tag_"+e.id);
    newTag.textContent = content;
    let close_icon = document.createElement("span");
    close_icon.innerHTML = '<i class="far fa-times-circle"></i>';
    close_icon.onclick = function(){closeTag(e.id,content)};
    newTag.appendChild(close_icon);
    document.querySelector(".filter-container_tag-container").appendChild(newTag);
    e.style.cssText = "display:none";
    updateFilter();
}

function closeTag(id,content){
    let index = allFilterSearchIndex[content];
    allFilterSearch.splice(index,1);
    allFilterSearchContent.splice(index,1);
    for(let i=index;i<allFilterSearchContent.length;i++){
        let w = allFilterSearchContent[i];
        allFilterSearchIndex[w]--;
    }
    document.querySelector("#"+id).style.cssText = " ";
    document.querySelector("#tag_"+id).remove();
    lastFilterIntersection = getAllFiltersIntersection();
    lastIntersection = getIntersectionOfAll();
    displayRecipes(lastIntersection);
    updateFilter();
}

function updateFilter(){
    let ingredients=[], appliance=[], ustensil=[];
    lastIntersection.forEach(r => {
        r.ingredients.forEach(i => {
            ingredients.push(i.ingredient.toLowerCase());
        })
        appliance.push(r.appliance.toLowerCase());
        r.ustensils.forEach( u => {ustensil.push(u.toLowerCase())});
    })
    ingredients = new Set(ingredients);
    appliance = new Set(appliance);
    ustensil = new Set(ustensil);
    ingredientTab = [...ingredients];
    applianceTab = [...appliance];
    ustensilTab = [...ustensil];
    ingInput = document.querySelector("#ingredient_input").value;
    appInput = document.querySelector("#appliance_input").value;
    ustInput = document.querySelector("#ustensil_input").value;
    for(let j=0;j<ingredientKw.length;j++){
        let ing = document.querySelector("#ingredient"+j);
        if(ingredientTab.includes(ing.textContent) && (ing.textContent.indexOf(ingInput) > -1)){
            ing.style.cssText = " ";
        }else{
            ing.style.cssText="display:none";
        }
    }
    for(let j=0;j<applianceKw.length;j++){
        let app = document.querySelector("#appliance"+j);
        if(applianceTab.includes(app.textContent) && (app.textContent.indexOf(appInput) > -1)){
            app.style.cssText = "";
        }else{
            app.style.cssText="display:none";
        }
    }
    for(let j=0;j<ustensilKw.length;j++){
        let ust = document.querySelector("#ustensil"+j);
        if(ustensilTab.includes(ust.textContent) && (ust.textContent.indexOf(ustInput) > -1)){
            ust.style.cssText = "";
        }else{
            ust.style.cssText="display:none";
        }
    }
}

/*Gestion des évènements*/
document.querySelector('.main-searchbar').oninput = function(){
    let word = this.value;
    let searchIntersection;
    if(word.length > 2){
        searchIntersection = searchWithMainbar(word);
    }else{
        searchIntersection = [...recipes];
        mainbarSearchResult = [...recipes];
    }
    if(allFilterSearch.length > 0){
        lastIntersection = getRecipesIntersection(searchIntersection,lastFilterIntersection);
    }else{
        lastIntersection = searchIntersection;
    }
    displayRecipes(lastIntersection);
    updateFilter();
}

document.querySelector("#ingredient_input + span").onclick = function(){
    if(document.querySelector('#ingredient-kw_container').style.display.length == 0){
        document.querySelector('#ingredient-kw_container').style.display = "grid";
    }else{
        document.querySelector('#ingredient-kw_container').style.display = "";
    }
}
document.querySelector("#appliance_input + span").onclick = function(){
    if(document.querySelector('#appliance-kw_container').style.display.length == 0){
        document.querySelector('#appliance-kw_container').style.display = "grid";
    }else{
        document.querySelector('#appliance-kw_container').style.display = "";
    }
}
document.querySelector("#ustensil_input + span").onclick = function(){
    if(document.querySelector('#ustensil-kw_container').style.display.length == 0){
        document.querySelector('#ustensil-kw_container').style.display = "grid";
    }else{
        document.querySelector('#ustensil-kw_container').style.display = "";
    }
}

document.querySelector('#ingredient_input').oninput = function search_filterI(){
    let searched_word = document.querySelector('#ingredient_input').value;
    let found_filter = 0;
    for(let i = 0;i<ingredientKw.length;i++){
        if(ingredientKw[i].toLowerCase().indexOf(searched_word.toLowerCase()) == -1){
            document.querySelector("#ingredient"+i).style.cssText = "display:none";
        }
        else{
            document.querySelector("#ingredient"+i).style.cssText = " ";
            found_filter++;
        }
    }
    /*On rajoute un message qui indique qu'aucun filtre n'a été trouvé*/
}
document.querySelector('#appliance_input').oninput = function search_filterI(){
    let searched_word = document.querySelector('#appliance_input').value;
    let found_filter = 0;
    for(let i = 0;i<ingredientKw.length;i++){
        if(applianceKw[i].toLowerCase().indexOf(searched_word.toLowerCase()) == -1){
            document.querySelector("#appliance"+i).style.cssText = "display:none";
        }
        else{
            document.querySelector("#appliance"+i).style.cssText = " ";
            found_filter++;
        }
    }
    /*On rajoute un message qui indique qu'aucun filtre n'a été trouvé*/
}
document.querySelector('#ustensil_input').oninput = function search_filterI(){
    let searched_word = document.querySelector('#ustensil_input').value;
    let found_filter = 0;
    for(let i = 0;i<ingredientKw.length;i++){
        if(ustensilKw[i].toLowerCase().indexOf(searched_word.toLowerCase()) == -1){
            document.querySelector("#ustensil"+i).style.cssText = "display:none";
        }
        else{
            document.querySelector("#ustensil"+i).style.cssText = " ";
            found_filter++;
        }
    }
    /*On rajoute un message qui indique qu'aucun filtre n'a été trouvé*/
}