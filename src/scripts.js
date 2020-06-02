
import './css/base.scss';
import './css/styles.scss';
import fetchData from './allData.js';
import Recipe from './recipe';
import User from './user';
import Cookbook from './cookbook';
import DomUpdates from './DomUpdates';



const data = {
  wcUsersData: null,
  ingredientsData: null,
  recipeData: null,
}

const userName = document.querySelector('.user-name');
const favButton = document.querySelector('.view-favorites');
const mealButton = document.querySelector('.view-meals');
const homeButton = document.querySelector('.home');
const pantryButton = document.querySelector('.view-pantry');
const shoppingListButton = document.querySelector('.view-shopping-list')
const searchButton = document.querySelector('.search-button');
const cardArea = document.querySelector('.all-cards');
const buyIngredientsButton = document.querySelector('.buy-ingredients-button');
let cookbook;
let searchInput = document.querySelector('#search-input');
let user;
let domUpdates;

homeButton.addEventListener('click', cardButtonConditionals);
favButton.addEventListener('click', viewFavorites);
mealButton.addEventListener('click', displayAddedMeals);
cardArea.addEventListener('click', cardButtonConditionals);
searchButton.addEventListener('click', filterRecipesBySearch);
buyIngredientsButton.addEventListener('click', addMissingIngredientsToPantryHelper);
pantryButton.addEventListener('click', () => domUpdates.displayPantryHTML(user, cardArea));
shoppingListButton.addEventListener('click', () => domUpdates.displayShoppingListToDOM(user, cardArea));


window.onload = onStartup;

function onStartup() {
  fetchData() 
    .then(allData => {
      data.wcUsersData = allData.wcUsersData;
      data.ingredientsData = allData.ingredientsData;
      data.recipeData = allData.recipeData;
    }) 
    .then( () => {
      addRecipeIngredientsDetails();
      instantiateClasses(data);
      addRecipesInfo();
      populateCards(cookbook.recipes);
      domUpdates.greetUserOnDOM(user, userName)
  
    }) 
    .catch(err => console.log(err.message))
}

function addMissingIngredientsToPantryHelper() {
  user.pantry.missingIngredients.forEach(missingIngredient => 
    addMissingIngredientsToPantry(29, missingIngredient.id, missingIngredient.quantity.amount))
  resetShoppingList();
}

function addMissingIngredientsToPantry(userID, ingredientID, ingredientModification) {
  fetch("https://fe-apps.herokuapp.com/api/v1/whats-cookin/1911/users/wcUsersData", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userID,
      ingredientID,
      ingredientModification
    }),
  })
    .then(response => response.json())
    .then(json => {
      console.log('Request success: ', json)
    })
    .catch(err => console.log('Request failure: ', err));
}

function resetShoppingList() {
  window.alert('You bought the ingredients! You can view them in your pantry');
  user.pantry.missingIngredients = [];
  user.shoppingList = [];
  domUpdates.displayPantryHTML(user, cardArea)
  domUpdates.displayShoppingListToDOM(user, cardArea);
  user.pantry.moveMissingIngredientsToContents(user);
}

function cookMeal(userID, ingredientID, ingredientModification) {
  fetch("https://fe-apps.herokuapp.com/api/v1/whats-cookin/1911/users/wcUsersData", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userID,
      ingredientID,
      ingredientModification: -ingredientModification
    }),
  })
    .then(response => response.json())
    .then(json => {
      console.log('Request success: ', json)
    })
    .catch(err => console.log('Request failure: ', err));
}

function instantiateClasses(data, userID) {
  let userId = data.userID || Math.floor(Math.random() * (48));
  cookbook = new Cookbook(data.recipeData);
  user = new User(userId, data.wcUsersData[userId].name, data.wcUsersData[userId].pantry, data);
  domUpdates = new DomUpdates();
}

function addRecipe(event) {
  let recipeToAdd = data.recipeData.find(recipe =>recipe.id === Number(event.target.id));
  user.addToMealList(recipeToAdd);
}

function displayAddedMeals() {
  domUpdates.displayAddedMealsToDOM(user, cardArea, mealButton);
  populateCards(user.mealList);
}

function viewFavorites() {
  domUpdates.displayFavoritesOnDOM(user, cardArea, favButton);
  populateCards(user.favoriteRecipes);
}

function favoriteCard(event) {
  let specificRecipe = cookbook.recipes.find(recipe => {
    if (recipe.id  === Number(event.target.parentNode.id)) {
      return recipe;
    }
  })
  specificRecipe.favorited = true;
  domUpdates.updateFavoriteIcon(favButton, user, specificRecipe, event.target);
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

  domUpdates.displayIngredientsInRecipeInfo(recipeObject, ingredientsSpan, instructionsSpan)
  domUpdates.displayTagsInRecipeInfo(recipeObject, tagsSpan);
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
    // let target = document.querySelector(`.favorite${recipe.id}`);
    // domUpdates.updateFavoriteIcon(favButton, user, recipe, target);
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

function addRecipeIngredientsDetails() {
  data.recipeData.forEach(recipe => 
    recipe.ingredients.forEach(recipeIngredient => {
      data.ingredientsData.find(ingredientFromData => {
        if (ingredientFromData.id === recipeIngredient.id) {
          recipeIngredient.name = ingredientFromData.name;
          ingredientFromData.unit = recipeIngredient.quantity.unit;
        }
        
      })
    }))
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