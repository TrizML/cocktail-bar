
function createCocktailCard (name,imageURL,id){

    var card = document.createElement ('div');
    card.classList.add ("card");

    var h3 = document.createElement ('h3');
    h3.textContent = name;
    card.appendChild(h3);

    var img = document.createElement ('img');
    img.src = imageURL;
    img.alt = "Photo of the cocktail named " + name
    card.appendChild(img);

    card.addEventListener("click", function (){
        var spotlight = createCocktailSpotlight(name, imageURL, id);
        document.body.appendChild (spotlight);
    });
    
    return card;
};

function createCocktailSpotlight (name, imageURL, id) {
    var spotlight = document.createElement ("div");
    spotlight.id = "spotlight";

    var spotlightCard = document.createElement ("div");
    spotlightCard.id = "spotlight-card";

    var h1 = document.createElement ("h1");
    h1.textContent = name;
    spotlightCard.appendChild(h1);

    var img = document.createElement("img");
    img.src = imageURL;
    spotlightCard.appendChild(img);

    var p = document.createElement("p");
    p.textContent = "Instructions will go here ...";
    spotlightCard.appendChild(p);

    spotlight.appendChild(spotlightCard);

    var promise = fetchJSON("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + id);

    promise.then(function (apiResponse) {
        var drink = apiResponse.drinks[0];

        var instructions = drink.strInstructions;
        p.textContent = instructions;
    });

    spotlight.addEventListener("click", function (){
        spotlight.remove();
    });

    return spotlight;
};

function fetchJSON(url){
    return new Promise(function(resolve, reject){
        // Constructor
        var request = new XMLHttpRequest();

        // Configuration
        request.open('GET', url);

        // Event Listener
        request.addEventListener('load', function (){ // Response is ready
            if (request.status != 200) {
                reject();
            }

            // Parse the response
            var response = JSON.parse(request.response);

            // Fullfill the promise
            resolve (response);
        });

        // Invoking the request
        request.send();
    });
}

var promise = fetchJSON('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin');

promise.then(function(apiResponse){
    // Get the Cocktail List
    var cocktailList = document.querySelector ("#cocktail-list");

    // Extract drinks from api Response
    var drinks = apiResponse.drinks;

    for (let i = 0; i < drinks.length; i++) {
        let drink = drinks[i];
        
        let name = drink.strDrink;
        let imageURL = drink.strDrinkThumb;
        let id = drink.idDrink;

        // Create a Cocktail Card
        let cocktailCard = createCocktailCard(name, imageURL, id);

        cocktailList.appendChild(cocktailCard);
    }
});

var myPromise = new Promise(function(resolve, reject) {
    reject(Error ("API not reachable"));
    resolve ("Here's your promise");
});

myPromise.then(function(resolvedPromise){
    console.log(resolvedPromise);
}).catch (function(error){

}); //--> This is equal to:
    // myPromise.catch(function(error){
    //    console.log (error);
    // });

/* WE DELETE ALL WHAT IS UNDER BECAUSE WE ALREADY INCORPORATED IT IN OUR PROMISE

// Constructor
const request = new XMLHttpRequest ();

// Configuration
request.open ('GET', 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin');

// Event listener
request.addEventListener('load', function (){
    console.log ("Request is finished");
    console.log (request.status);
    console.log (request.response);

    // Parse JSON response from API
    var apiResponse = JSON.parse(request.response);

    // Get the Cocktail List
    var cocktailList = document.querySelector ("#cocktail-list");

    // Extract drinks from api Response
    var drinks = apiResponse.drinks;

    for (let i = 0; i < drinks.length; i++) {
        let drink = drinks[i];
        
        let name = drink.strDrink;
        let imageURL = drink.strDrinkThumb;
        let id = drink.idDrink;

        // Create a Cocktail Card
        let cocktailCard = createCocktailCard(name, imageURL, id);

        cocktailList.appendChild(cocktailCard);
    }
});

// Invoke
request.send();
console.log ("Request is sent");
*/
