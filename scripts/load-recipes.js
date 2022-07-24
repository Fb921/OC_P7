var xhttp = new XMLHttpRequest();
xhttp.open("GET", "./data/recipes.json", false);
xhttp.send();
const recipes = JSON.parse(xhttp.responseText);

console.log(recipes);

for(let i=0;i<recipes.length;i++){
    let article = document.createElement("article");
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
}

