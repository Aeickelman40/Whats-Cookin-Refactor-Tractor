
import './css/base.scss';
import './css/styles.scss';
import fetchData from './allData.js';
import Pantry from './pantry';
import Recipe from './recipe';
import User from './user';
import Cookbook from './cookbook';
import DomUpdates from './DomUpdates';

// import recipeData from './data/recipes';
// import ingredientsData from './data/ingredients';
// import users from './data/users';

const data = {
  wcUsersData: null,
  ingredientsData: null,
  recipeData: null
}

const favButton = document.querySelector('.view-favorites');
const mealButton = document.querySelector('.view-meals');
const homeButton = document.querySelector('.home');
const pantryButton = document.querySelector('.view-pantry');
const shoppingListButton = document.querySelector('.view-shopping-list')
const searchButton = document.querySelector('.search-button');
const cardArea = document.querySelector('.all-cards');
let cookbook;
let searchInput = document.querySelector('.search-input');
let user;
let domUpdates;

homeButton.addEventListener('click', cardButtonConditionals);
favButton.addEventListener('click', viewFavorites);
mealButton.addEventListener('click', displayAddedMeals);
cardArea.addEventListener('click', cardButtonConditionals);
searchButton.addEventListener('click', filterRecipesBySearch);
pantryButton.addEventListener('click', displayPantry);
shoppingListButton.addEventListener('click', displayShoppingList);

window.onload = onStartup;

function onStartup() {
  fetchData() 
    .then(allData => {
      data.wcUsersData = allData.wcUsersData;
      data.ingredientsData = allData.ingredientsData;
      data.recipeData = allData.recipeData;
    }) 
    .then( () => {
      let userId = 28;
      addRecipeIngredients();
      cookbook = new Cookbook(data.recipeData);
      user = new User(userId, data.wcUsersData[userId].name, data.wcUsersData[userId].pantry);
      domUpdates = new DomUpdates();
      addRecipesInfo();
      populateCards(cookbook.recipes);
      greetUser();
  
    }) 
    .catch(err => console.log(err.message)) 
}

function addRecipe(event) {
  let recipeToAdd = data.recipeData.find(recipe =>recipe.id === Number(event.target.id));

  user.addToMealList(recipeToAdd);
}

function displayAddedMeals() {
  if (cardArea.classList.contains('all')) {
    cardArea.classList.remove('all');
  }
  if (!user.mealList.length) {
    mealButton.innerHTML = 'You have no meals yet';
  } else {
    cardArea.innerHTML = '';
  }
  populateCards(user.mealList);
}

function viewFavorites() {
  if (cardArea.classList.contains('all')) {
    cardArea.classList.remove('all')
  }
  if (!user.favoriteRecipes.length) {
    favButton.innerHTML = 'You have no favorites!';
  } else {
    favButton.innerHTML = 'Refresh Favorites'
    cardArea.innerHTML = '';
  }
  populateCards(user.favoriteRecipes);
}

function greetUser() {
  const userName = document.querySelector('.user-name');
  userName.innerHTML = user.name;
}

function favoriteCard(event) {
  let specificRecipe = cookbook.recipes.find(recipe => {
    if (recipe.id  === Number(event.target.parentNode.id)) {
      return recipe;
    }
  })
  specificRecipe.favorited = true;
  
  if (!event.target.classList.contains('favorite-active')) {
    event.target.classList.add('favorite-active');
    favButton.innerHTML = 'View Favorites';
    user.addToFavorites(specificRecipe);
  } else if (event.target.classList.contains('favorite-active')) {
    event.target.classList.remove('favorite-active');
    user.removeFromFavorites(specificRecipe)
  }
}

function cardButtonConditionals(event) {
  if (event.target.classList.contains('add-button')) {
    addRecipe(event);
  } else if (event.target.classList.contains('favorite')) {
    favoriteCard(event);
  } else if (event.target.classList.contains('card-picture')) {
    displayDirections(event);
  } else if (event.target.classList.contains('home')) {
    favButton.innerHTML = 'View Favorites';
    populateCards(cookbook.recipes);
    cardArea.classList.remove('all');
  } 
}

function displayDirections(event) {
  let newRecipeInfo = cookbook.recipes.find(recipe => {
    if (recipe.id === Number(event.target.id)) {
      return recipe;
    }
  })
  let recipeObject = new Recipe(newRecipeInfo, data.ingredientsData);
  let cost = recipeObject.calculateCost()
  let costInDollars = (cost / 100).toFixed(2)
  cardArea.classList.add('all');
  domUpdates.returnDirectionsInnerHTML(cardArea, recipeObject, costInDollars);
  displayRecipeInfo(recipeObject)
  
}
function displayRecipeInfo(recipeObject) {

  let ingredientsSpan = document.querySelector('.ingredients');
  let instructionsSpan = document.querySelector('.instructions');
  let tagsSpan = document.querySelector('.recipe-tags');
  recipeObject.ingredients.forEach(ingredient => {
    ingredientsSpan.insertAdjacentHTML('afterbegin', `<ul><li>
    ${ingredient.quantity.amount.toFixed(2)} ${ingredient.quantity.unit}
    ${ingredient.name}</li></ul>
    `)
  })
  recipeObject.instructions.forEach(instruction => {
    instructionsSpan.insertAdjacentHTML('beforebegin', `<li>
    ${instruction.instruction}</li>
    `)
  })
  recipeObject.tags.forEach(tag => {
    tagsSpan.insertAdjacentHTML('beforebegin', `<li>
    ${tag}</li>
    `);
  });
}

function getFavorites() {
  if (user.favoriteRecipes.length) {
    user.favoriteRecipes.forEach(recipe => {
      document.querySelector(`.favorite${recipe.id}`).classList.add('favorite-active')
    })
  }
}

function populateCards(recipes) {
  cardArea.innerHTML = '';
  if (cardArea.classList.contains('all')) {
    cardArea.classList.remove('all')
  }
  recipes.forEach(recipe => {
    domUpdates.populateCardsHTML(cardArea, recipe);
  })
  // Why call getFavorites at the end of this?
  getFavorites();
}

function filterRecipesBySearch() {
  event.preventDefault();
  let recipesByIngredient = data.recipeData.filter(recipe => {
    let filteredIngredients = recipe.ingredients.filter(ingredient => 
      ingredient.name.toLowerCase().includes(searchInput.value.toLowerCase())) 
    if (filteredIngredients.length > 0) {
      return true;
    }
  })  
  let recipesByName = data.recipeData.filter(recipe => recipe.name.toLowerCase().includes(searchInput.value.toLowerCase()));
  let recipesByTag = data.recipeData.filter(recipe => recipe.tags.includes(searchInput.value.toLowerCase()))
  let searchedRecipes = recipesByIngredient.concat(recipesByName, recipesByTag);
  let uniqueSearchedRecipes = [...new Set(searchedRecipes)];
  populateCards(uniqueSearchedRecipes);
}

function addRecipeIngredients() {
  data.recipeData.forEach(recipe => 
    recipe.ingredients.forEach(recipeIngredient => {
      data.ingredientsData.find(ingredientFromData => {
        if (ingredientFromData.id === recipeIngredient.id) {
          recipeIngredient.name = ingredientFromData.name;
          ingredientFromData.unit = recipeIngredient.quantity.unit;
        }
        
      })
    }))
  //Add ingredient names to pantry
  
}

function addRecipesInfo() {
  user.pantry.contents.forEach(pantryIngredient => {
    data.ingredientsData.find(ingredientFromData => {
      if (pantryIngredient.ingredient === ingredientFromData.id) {
        pantryIngredient.name = ingredientFromData.name;
        pantryIngredient.unit = ingredientFromData.unit;
      }
    })
  })
}
function displayPantry() {
  // Attempt to pull amount names into the display(tablespoon, etc.)
  cardArea.innerHTML = '';
  user.pantry.contents.forEach(ingredient => {
    //console.log(ingredient)
    let ingredientHtml = `<li> ${ingredient.name}, ${ingredient.amount} ${ingredient.unit}</li>`
    cardArea.insertAdjacentHTML("afterbegin", ingredientHtml);
  });
}

function displayShoppingList() {
  cardArea.innerHTML = '';
  user.shoppingList.forEach((ingredient) => {
    //console.log(ingredient)
    let listHtml = `<li> ${ingredient.name}, ${ingredient.amount} ${ingredient.unit}</li>`
    cardArea.insertAdjacentHTML('afterbegin', listHtml)
  })
}
export default data;
