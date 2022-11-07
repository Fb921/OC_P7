/*Déclaration des variables*/
var intersectionOfSearchedRecipes = [...recipes];
var allSearchedRecipes = [{"id":"","type":"mainbar","recipes":[...recipes]}];
var ingredientTab=[];
var applianceTab=[];
var ustensilTab=[];

/*Fonctions qui implémentent les fonctionnalités de recherche*/
function searchRecipes(word,type){
    let w = word.toLowerCase();
    let t = [];
    if(type == "mainbar"){
        if(w.length > 2){
            intersectionOfSearchedRecipes.forEach(r => {
                /*On regarde si on trouve le mot dans les ingrédients*/
                let inIngredient = false;
                for(let y = 0;y < r.ingredients.length;y++){
                    if(r.ingredients[y].ingredient.toLowerCase().indexOf(w) > -1){
                        inIngredient = true;
                        break;
                    }
                }
                if((r.name.toLowerCase().indexOf(w) > -1) || inIngredient || (r.description.toLowerCase().indexOf(w) > -1)){
                    /*Alors on le rajoute dans t*/
                    t.push(r);
                }
            })
        }else{
            t = [...recipes];
        }
    }else if(type == "ingredient"){
        intersectionOfSearchedRecipes.forEach(r => {
            /*On regarde si on trouve le mot dans les ingrédients*/
            let inIngredient = false;
            r.ingredients.forEach(i => {
                if(i.ingredient.toLowerCase().indexOf(w) > -1){
                    inIngredient = true;
                }
            })
            /*On on retrouve le mot dans les ingrédients */
            if(inIngredient){
                /*Alors on le rajoute dans t*/
                t.push(r);
            }
        })
    }else if(type == "appliance"){
        intersectionOfSearchedRecipes.forEach(r => {
            /*On regarde si on retrouve le mot dans les appliances */
            if(r.appliance.toLowerCase().indexOf(w) > -1){
                /*Alors on rajoute la recette dans t*/
                t.push(r);
            }
        })
    }else{
        intersectionOfSearchedRecipes.forEach(r => {
            let inUstensil = false;
            r.ustensils.forEach( u => {
                if(u.toLowerCase().indexOf(w) > -1){
                    inUstensil= true;
                }
            })
            if(inUstensil){t.push(r);}
        })
    }
    return t;
}

function searchInAllRecipe(word,type){
    let w = word.toLowerCase();
    let t = [];
    if(type == "mainbar"){
        if(w.length > 2){
            recipes.forEach(r => {
                /*On regarde si on trouve le mot dans les ingrédients*/
                let inIngredient = false;
                for(let y = 0;y < r.ingredients.length;y++){
                    if(r.ingredients[y].ingredient.toLowerCase().indexOf(w) > -1){
                        inIngredient = true;
                        break;
                    }
                }
                /*On on retrouve le mot dans le titre, dans la description ou dans les ingrédients */
                if((r.name.toLowerCase().indexOf(w) > -1) || inIngredient || (r.description.toLowerCase().indexOf(w) > -1)){
                    /*Alors on le rajoute dans t*/
                    t.push(r);
                }
            })
        }else{
            t = [...recipes];
        }
    }else if(type == "ingredient"){
        recipes.forEach(r => {
            /*On regarde si on trouve le mot dans les ingrédients*/
            let inIngredient = false;
            r.ingredients.forEach(i => {
                if(i.ingredient.toLowerCase().indexOf(w) > -1){
                    inIngredient = true;
                }
            })
            /*On on retrouve le mot dans les ingrédients */
            if(inIngredient){
                /*Alors on le rajoute dans t*/
                t.push(r);
            }
        })
    }else if(type == "appliance"){
        recipes.forEach(r => {
            /*On regarde si on retrouve le mot dans les appliances */
            if(r.appliance.toLowerCase().indexOf(w) > -1){
                /*Alors on rajoute la recette dans t*/
                t.push(r);
            }
        })
    }else{
        recipes.forEach(r => {
            let inUstensil = false;
            r.ustensils.forEach( u => {
                if(u.toLowerCase().indexOf(w) > -1){
                    inUstensil= true;
                }
            })
            if(inUstensil){t.push(r);}
        })
    }
    if(type == "mainbar"){
        allSearchedRecipes[0] = {"id":w,"type":type,"recipes":t};
    }else{
        allSearchedRecipes.push({"id":w,"type":type,"recipes":t});
    }
    return t;
}

function displayRecipes(t){
    recipes.forEach( r => {
        if(t.includes(r)){
            document.querySelector('#recipe'+r.id).style.cssText = " ";
        }else{
            document.querySelector('#recipe'+r.id).style.cssText = "display:none";
        }
    })
}

function createFilterTag(id,content,type){
    let filter_container = document.createElement("div");
    filter_container.setAttribute("id","tag_"+id);
    filter_container.setAttribute("class","filter_tag "+type+"_tag");
    filter_container.textContent = content;
    let close_icon = document.createElement("span");
    close_icon.innerHTML = '<i class="far fa-times-circle"></i>';
    close_icon.onclick = function(){closeFilterTag(id,content)};
    filter_container.appendChild(close_icon);
    document.querySelector(".filter-container_tag-container").appendChild(filter_container);
}

function addFilter(e){
    if(e.id.indexOf("ingredient") > -1){
        createFilterTag(e.id,e.textContent,"ingredient");
        searchInAllRecipe(e.textContent,"ingredient");
        intersectionOfSearchedRecipes = searchRecipes(e.textContent,"ingredient");
    }else if(e.id.indexOf("appliance") > -1){
        createFilterTag(e.id,e.textContent,"appliance");
        searchInAllRecipe(e.textContent,"appliance");
        intersectionOfSearchedRecipes = searchRecipes(e.textContent,"appliance");
    }else if(e.id.indexOf("ustensil") > -1){
        createFilterTag(e.id,e.textContent,"ustensil");
        searchInAllRecipe(e.textContent,"ustensil");
        intersectionOfSearchedRecipes = searchRecipes(e.textContent,"ustensil");
    }
    displayRecipes(intersectionOfSearchedRecipes);
    document.querySelector("#"+e.id).style.cssText = "display:none";
    updateFilter();
}

function getIndexOfSearch(id){
    let index;
    allSearchedRecipes.forEach((s,i) => {
        if(s.id == id){
            index = i;
        }
    })
    return index;
}

function closeFilterTag(id,content){
    /*On enlève le tag de l'écran*/
    document.querySelector("#tag_"+id).remove();
    /*On enlève le filtre de allSearchedRecipes*/
    let index = getIndexOfSearch(content);
    allSearchedRecipes.splice(index,1);
    /*On reaffiche le filtre dans la liste de filtre */
    document.querySelector("#"+id).style.cssText =" ";
    /*On recalcule l'intersection de tous les filtres qui restent */
    intersectionOfSearchedRecipes = [...recipes];
    allSearchedRecipes.forEach(s => {
        intersectionOfSearchedRecipes = searchRecipes(s.id,s.type);
    })
    displayRecipes(intersectionOfSearchedRecipes);
    updateFilter();
}

function updateFilter(){
    let ingredients=[], appliance=[], ustensil=[];
    intersectionOfSearchedRecipes.forEach(r => {
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
document.querySelector(".main-searchbar").oninput = function(){
    /*Il n'y a pas de filtre de précision*/
    if(allSearchedRecipes.length < 2){
        intersectionOfSearchedRecipes=searchRecipes(this.value,"mainbar");
        searchInAllRecipe(this.value,"mainbar");
    }else{
        searchInAllRecipe(this.value,"mainbar");
        intersectionOfSearchedRecipes = [...recipes];
        allSearchedRecipes.forEach(s => {
            intersectionOfSearchedRecipes = searchRecipes(s.id,s.type);
        })        
    }
    displayRecipes(intersectionOfSearchedRecipes);
    updateFilter();
    if(intersectionOfSearchedRecipes.length == 0){
        document.querySelector(".no-result_container").style.cssText = "display:block";
    }else{
        document.querySelector(".no-result_container").style.cssText = " ";
    }
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

document.querySelector("#ingredient_input").oninput = function(){
    let s = this.value;
    ingredientTab.forEach( (i,index) => {
        if(i.toLowerCase().indexOf(s) == -1){
            document.querySelector('#ingredient'+index).style.cssText = "display:none";
        }
        else{
            document.querySelector('#ingredient'+index).style.cssText = " ";
        }
    })
}
document.querySelector("#appliance_input").oninput = function(){
    let s = this.value;
    applianceTab.forEach( (i,index) => {
        if(i.toLowerCase().indexOf(s) == -1){
            document.querySelector('#appliance'+index).style.cssText = "display:none";
        }
        else{
            document.querySelector('#appliance'+index).style.cssText = " ";
        }
    })
}
document.querySelector("#ustensil_input").oninput = function(){
    let s = this.value;
    ustensilTab.forEach( (i,index) => {
        if(i.toLowerCase().indexOf(s) == -1){
            document.querySelector('#ustensil'+index).style.cssText = "display:none";
        }
        else{
            document.querySelector('#ustensil'+index).style.cssText = " ";
        }
    })
}