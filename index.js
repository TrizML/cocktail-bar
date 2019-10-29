var apiResponse = {
    "drinks": [
       {
          "strDrink": "3-Mile Long Island Iced Tea",
          "strDrinkThumb": "https:\/\/www.thecocktaildb.com\/images\/media\/drink\/rrtssw1472668972.jpg",
          "idDrink": "15300"
        },
        {
          "strDrink": "69 Special",
          "strDrinkThumb": "https:\/\/www.thecocktaildb.com\/images\/media\/drink\/vqyxqx1472669095.jpg",
          "idDrink": "13940"
        },
        {
          "strDrink": "A1",
          "strDrinkThumb": "https:\/\/www.thecocktaildb.com\/images\/media\/drink\/2x8thr1504816928.jpg",
          "idDrink": "17222"
        },
        {
          "strDrink": "Abbey Cocktail",
          "strDrinkThumb": "https:\/\/www.thecocktaildb.com\/images\/media\/drink\/quyyuw1472811568.jpg",
          "idDrink": "17834"
        },
        {
          "strDrink": "Abbey Martini",
          "strDrinkThumb": "https:\/\/www.thecocktaildb.com\/images\/media\/drink\/2mcozt1504817403.jpg",
          "idDrink": "17223"
        },
        {
          "strDrink": "Ace",
          "strDrinkThumb": "https:\/\/www.thecocktaildb.com\/images\/media\/drink\/l3cd7f1504818306.jpg",
          "idDrink": "17225"
        },
        {
          "strDrink": "Adam & Eve",
          "strDrinkThumb": "https:\/\/www.thecocktaildb.com\/images\/media\/drink\/vfeumw1504819077.jpg",
          "idDrink": "17226"
        },
        {
          "strDrink": "Addison",
          "strDrinkThumb": "https:\/\/www.thecocktaildb.com\/images\/media\/drink\/yzva7x1504820300.jpg",
          "idDrink": "17228"
        }
    ]
 };
// References we are going to use document.createElement and element.classList 

function createCocktailCard (name, imageURL, id){
    var cocktailCard = document.createElement("div");
    cocktailCard.classList.add("card");

    var h3 = document.createElement("h3");
    h3.textContent = name;
    cocktailCard.appendChild(h3);

    var img = document.createElement("img");
    img.src = imageURL;
    cocktailCard.appendChild(img);

    cocktailCard.addEventListener ('click', function (event) {
        var spotlight = createCocktailSpotlight (name, imageURL, id);
        document.body.appendChild (spotlight);
     });

    return cocktailCard;

};


// We don't want to add the cocktail cards directly to the body, instead we want to create a container with a list element inside. 
// USE: document.querySelector
var cocktailList = document.querySelector ("#cocktail-list");

// Add a fake apiResponse at the beginning of your index.js file.
// Now we want to get the drinks from the response and loop over them

var drinks = apiResponse.drinks;

for (let i = 0; i < drinks.length; i++){
    var drink = drinks [i];
    var name = drink.strDrink;
    var imageURL = drink.strDrinkThumb;
    var id = drink.idDrink;

    var cocktailCard = createCocktailCard (name, imageURL, id);
    cocktailList.appendChild(cocktailCard);
};



// Now instead of appending our one testCocktailCard let's append a cocktail card in every iteration of the loop.

// Next we want to add a modal spotlight screen with more details about a cocktail, that gets shown when you click on a cocktail card.
// USE addEventListener

function createCocktailSpotlight (name, imageURL, id){

    let spotlight = document.createElement("div");
    spotlight.id = "spotlight";

    let instructionsCard = document.createElement("div");
    instructionsCard.id = "spotlight-card";

    let h1 = document.createElement("h1");
    h1.textContent = name;
    instructionsCard.appendChild(h1);

    let img = document.createElement("img");
    img.src = imageURL;
    instructionsCard.appendChild(img);

    let instructions = document.createElement("p");
    instructions.textContent = "Drink it!";
    instructionsCard.appendChild(instructions);

    spotlight.appendChild(instructionsCard);

    spotlight.addEventListener('click', function (event) {
        spotlight.remove();
     });

    return spotlight;
};


// Call an API with XMLHttpRequest

function addCocktailCard(apiResponse){
    
    var request = new XMLHttpRequest ();
request.open("GET", "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007");

request.addEventListener("load", function(event){
    var apiResponse = JSON.parse(request.response);
});

request.send();
}

