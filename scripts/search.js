var ingredientOpen = false;
var applianceOpen = false;
var ustensilOpen = false;

/*Recherche dans la bar de recherche principale*/
document.querySelector('.main-searchbar').onfocus = function closeFilter(){
    ingredientOpen = false;
    applianceOpen = false;
    ustensilOpen = false;
    document.querySelector('#appliance_input + span + div').style.cssText = '';
    document.querySelector('#ingredient_input + span + div').style.cssText = '';
    document.querySelector('#ustensil_input + span + div').style.cssText = '';
}
// document.querySelector('.main-searchbar').oninput = function initSearch() {
//     if(this.value.length > 2){
//         searchRecipes(this.value.toLowerCase());
//     }
//     else{
//         if(filter_activated == 0){
//             resetRecipes();
//         }else{

//         }  
//     }
// }

/*Affiche toutes les recettes*/
// function resetRecipes(){
//     let searched_recipes_temp = [];
//     recipes.forEach(i => {
//         document.querySelector('#recipe'+i.id).style.cssText = " ";
//         searched_recipes_temp.push(i);
//     });
//     console.log(searched_recipes_temp);
//     searched_recipes = searched_recipes_temp;
//     search_activated = false;
//     searched_recipes_trash = [];
// }

/*Pour trier et afficher les recettes selon la valeur de s*/
// function searchRecipes(s){
//     let searched_recipes_temp = [];
//     searched_recipes.forEach( i => {
//         let inIngredient = false;
//         for(let y = 0;y < i.ingredients.length;y++){
//             if(i.ingredients[y].ingredient.toLowerCase().indexOf(s) > -1){
//                 inIngredient = true;
//             }
//         }
//         if(i.name.toLowerCase().indexOf(s) == -1 && !inIngredient && (i.description.toLowerCase().indexOf(s) == -1)){
//             document.querySelector('#recipe'+i.id).style.cssText = "display:none";

//         }
//         else{
//             searched_recipes_temp.push(i);
//             document.querySelector('#recipe'+i.id).style.cssText = " ";
//         }
//     })
//     search_activated = true;
//     searched_recipes =  searched_recipes_temp;
// }


/*Fonctions permettant de filtrer les filtres*/
document.querySelector('#ingredient_input').oninput = function initSearch() {
    searchInIngredient(this.value.toLowerCase());
}
document.querySelector('#appliance_input').oninput = function initSearch() {
    if(this.value.length > 2){
        searchInAppliance(this.value.toLowerCase());
    }
    else{
        resetRecipes();
    }
}
document.querySelector('#ustensil_input').oninput = function initSearch() {
    if(this.value.length > 2){
        searchInUstensils(this.value.toLowerCase());
    }
    else{
        resetRecipes();
    }
}

function searchInIngredient(s){
    ingredientKw.forEach( (i,index) => {
        if(i.toLowerCase().indexOf(s) == -1){
            document.querySelector('#ingredient'+index).style.cssText = "display:none";
        }
        else{
            document.querySelector('#ingredient'+index).style.cssText = " ";
        }
    })
}
function searchInAppliance(s){
    recipes.forEach( i => {
        if(i.appliance.toLowerCase().indexOf(s) == -1){
            document.querySelector('#recipe'+i.id).style.cssText = "display:none";
        }
        else{
            document.querySelector('#recipe'+i.id).style.cssText = " ";
        }
    })
}

function searchInUstensils(s){
    recipes.forEach( i => {
        let inUstensils = false;
        for(let y = 0;y < i.ustensils.length;y++){
            if(i.ustensils[y].toLowerCase().indexOf(s) > -1){
                inUstensils = true;
            }
        }
        if(!inUstensils){
            document.querySelector('#recipe'+i.id).style.cssText = "display:none";
        }
        else{
            document.querySelector('#recipe'+i.id).style.cssText = " ";
        }
    })
}


/*Affiche les filtres lors du clic sur la flèche pour chaque type de filtre*/

document.querySelector('#ingredient_input + span').onclick = function openFilterI(){
    if(!ingredientOpen){
        document.querySelector('#ingredient_input + span + div').style.cssText = 'display:grid';
        document.querySelector('#appliance_input + span + div').style.cssText = '';
        document.querySelector('#ustensil_input + span + div').style.cssText = '';
    }else{document.querySelector('#ingredient_input + span + div').style.cssText = '';
    }
    ingredientOpen=!ingredientOpen;
    applianceOpen=false;
    ustensilOpen=false;

}
document.querySelector('#appliance_input + span').onclick = function openFilterA(){
    if(!applianceOpen){
        document.querySelector('#appliance_input + span + div').style.cssText = 'display:grid';
        document.querySelector('#ingredient_input + span + div').style.cssText = '';
        document.querySelector('#ustensil_input + span + div').style.cssText = '';
    }else{document.querySelector('#appliance_input + span + div').style.cssText = '';}
    applianceOpen=!applianceOpen;
    ingredientOpen=false;
    ustensilOpen=false;
}
document.querySelector('#ustensil_input + span').onclick = function openFilterU(){
    if(!ustensilOpen){
        document.querySelector('#ustensil_input + span + div').style.cssText = 'display:grid';
        document.querySelector('#appliance_input + span + div').style.cssText = '';
        document.querySelector('#ingredient_input + span + div').style.cssText = '';
    }else{document.querySelector('#ustensil_input + span + div').style.cssText = '';}
    ustensilOpen=!ustensilOpen;
    ingredientOpen=false;
    applianceOpen=false;
}




/*Permet de filter les mots clés suite aux mots tapés dans la barre de recherche*/

document.querySelector('#ingredient_input').oninput = function search_filterI(){
    let searched_word = document.querySelector('#ingredient_input').value;
    let found_filter = 0;
    for(let i = 0;i<ingredientKw.length;i++){
        if(ingredientKw[i].toLowerCase().indexOf(searched_word.toLowerCase()) == -1){
            document.querySelector("#ingredient"+i).style.cssText = "display:none";
        }
        else{
            document.querySelector("#ingredient"+i).style.cssText = " ";
            console.log("found");console.log(ingredientKw[i]);
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

// function searchRecipeByIngredient(str,id){
//     let s = str.toLowerCase();
//     let searched_recipes_temp = [];
//     searched_recipes.forEach( i => {
//         let inIngredient = false;
//         for(let y = 0;y < i.ingredients.length;y++){
//             console.log(i.ingredients[y].ingredient);
//             console.log(s);
//             console.log(i.ingredients[y].ingredient.toLowerCase().indexOf(s));
//             console.log("-----------------------");
//             if(i.ingredients[y].ingredient.toLowerCase().indexOf(s) > -1){
//                 inIngredient = true;
//             }
//         }
//         if(!inIngredient){
//             document.querySelector('#recipe'+i.id).style.cssText = "display:none";
//             /* */
//             if(!searched_recipes_trash[id]){
//                 searched_recipes_trash[id] = [i];
//             }else{searched_recipes_trash[id].push(i);}
        
//         }
//         else{
//             searched_recipes_temp.push(i);
//             document.querySelector('#recipe'+i.id).style.cssText = " ";
//         }
//     })
//     filter_activated++;
//     search_activated = true;
//     searched_recipes =  searched_recipes_temp;
// }

/* -------------------------------------------------------------------- */


// function filterRecipes(str,recipes){
//     let s = str.toLowerCase();
//     let filtered_recipes = [];
//     recipes.forEach(i => {
//         let inIngredient = false;
//         for(let y = 0;y < i.ingredients.length;y++){
//             if(i.ingredients[y].ingredient.toLowerCase().indexOf(s) > -1){
//                 inIngredient = true;
//             }
//         }
//         if(inIngredient){
//             filtered_recipes.push(i);            
//         }
//     })
//     return filtered_recipes;
// }
// function filterRecipesWtIngredient(str,recipes){
//     let s = str.toLowerCase();
//     let filtered_recipes = [];
//     recipes.forEach(i => {
//         let inIngredient = false;
//         for(let y = 0;y < i.ingredients.length;y++){
//             if(i.ingredients[y].ingredient.toLowerCase().indexOf(s) > -1){
//                 inIngredient = true;
//             }
//         }
//         if(inIngredient){
//             filtered_recipes.push(i);            
//         }
//     })
//     return filtered_recipes;
// }
// function filterRecipesWtIngredient(str,recipes){
//     let s = str.toLowerCase();
//     let filtered_recipes = [];
//     recipes.forEach(i => {
//         let inIngredient = false;
//         for(let y = 0;y < i.ingredients.length;y++){
//             if(i.ingredients[y].ingredient.toLowerCase().indexOf(s) > -1){
//                 inIngredient = true;
//             }
//         }
//         if(inIngredient){
//             filtered_recipes.push(i);            
//         }
//     })
//     return filtered_recipes;
// }

/* */
/*La derniere intersection de tous les éléments de recherche obtenu*/
var lastFilterResult = [];
/*La dernière intersection des filtres ingrédients, appareils, ustensils obtenue*/
var lastIAUFilterResult = [];
/*Tous les résultats des filtres de chaque élément IAU de recherche obtenu*/
var allIAUFilterResult =[];
var allIAUFilterResultIndex =[];
var lastCommonFilter = [];
/*Recettes issue de la recherche dans la mainbar*/
var mainbarFilterResult = [];

function filterWMainbar(str){
    let s = str.toLowerCase();
    let filtered_recipes = [];
    mainbarFilterResult = [];
    recipes.forEach(i => {
        let inIngredient = false;
        for(let y = 0;y < i.ingredients.length;y++){
            if(i.ingredients[y].ingredient.toLowerCase().indexOf(s) > -1){inIngredient = true;}
        }
        if((i.name.toLowerCase().indexOf(s) > -1) || inIngredient || (i.description.toLowerCase().indexOf(s) > -1)){
            filtered_recipes.push(i);
            mainbarFilterResult.push(i);
        }})
    return filtered_recipes;
}

function filterWIngredient(str){
    console.log("filterWI");
    let s = str.toLowerCase();
    filter_activated++;
    let filtered_recipes = [];
    recipes.forEach(i => {
        let inIngredient = false;
        for(let y = 0;y < i.ingredients.length;y++){
            if(i.ingredients[y].ingredient.toLowerCase().indexOf(s) > -1){
                inIngredient = true;
            }}
        if(inIngredient){filtered_recipes.push(i)}
    })
    allIAUFilterResult.push(filtered_recipes);
    allIAUFilterResultIndex[str]= filter_activated-1;

    return filtered_recipes;
}
function filterWAppliance(str){
    let s = str.toLowerCase();
    let filtered_recipes = [];
    recipes.forEach(i => {
        if(i.appliance.indexOf(s) > -1){
            filtered_recipes.push(i);            
        }
    })
    allIAUFilterResult.push(filtered_recipes);
    return filtered_recipes;
}
function filterWUstensil(str){
    let s = str.toLowerCase();
    let filtered_recipes = [];
    recipes.forEach(i => {
        let inUstensil = false;
        for(let y = 0;y < i.ustensils.length;y++){
            if(i.ustensils[y].toLowerCase().indexOf(s) > -1){
                inUstensil= true;
            }
        }
        if(inUstensil){
            filtered_recipes.push(i);            
        }
    })
    allFilterResult.push(filtered_recipes);
    return filtered_recipes;
}

function getCommonRecipes(t1,t2){
    let commonRecipes = [];
    t1.forEach(t => {
        if(t2.includes(t)){commonRecipes.push(t);}
    })
    return commonRecipes;
}

function getCommonIAUFilter(t){
    let commonRecipes = t[0].recipe;
    for(let i = 0;i<(t.length-1);i++){
        commonRecipes = getCommonRecipes(commonRecipes,t[i+1].recipe);}
    return commonRecipes;
}

function filterCommonRecipes(t){
    let commonRecipes = t[0];
    console.log()
    for(let i = 0;i<(t.length-1);i++){
        commonRecipes = getCommonRecipes(commonRecipes,t[i+1]);}
    return commonRecipes;
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

document.querySelector('.main-searchbar').oninput = function searchWMainbar(){
    let search = document.querySelector('.main-searchbar').value.toLowerCase();
    let common = filterWMainbar(search);
    if(filter_activated > 0){
        lastFilterResult = getCommonRecipes(common,lastIAUFilterResult);
        
    }else{lastFilterResult = common;}
    displayRecipes(lastFilterResult);
}