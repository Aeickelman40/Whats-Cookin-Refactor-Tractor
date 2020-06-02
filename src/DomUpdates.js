class DomUpdates {

  returnDirectionsInnerHTML(cardArea, recipeObject, costInDollars) {
    cardArea.innerHTML = `<h3>${recipeObject.name}</h3>
    <p class='all-recipe-info'>
    <strong>It will cost: </strong><span class='cost recipe-info'>
    $${costInDollars}</span><br><br>
    <strong>You will need: </strong><span class='ingredients recipe-info'></span>
    <strong>Instructions: </strong><ol><span class='instructions recipe-info'>
    </span></ol>
    <strong> Tags: </strong><ol><span class='recipe-tags recipe-info'></span></ol>
    <p>`
  }
  
  populateCardsHTML(cardArea, recipe) {
    cardArea.insertAdjacentHTML('afterbegin', 
      `<section id='${recipe.id}'class='card'>
        <header id='${recipe.id}' class='card-header'>
          <label for='add-button' class='hidden'>Click to add recipe</label>
          <button id='${recipe.id}' aria-label='add-button' class='add-button card-button'></button>
          <button id='${recipe.id}' aria-label='favorite-button' class='favorite favorite${recipe.id} card-button'></button>
        </header>
          <span id='${recipe.id}' class='recipe-name'>${recipe.name}</span>
          <img id='${recipe.id}' tabindex='0' class='card-picture'
          src='${recipe.image}' alt='click to view recipe for ${recipe.name}'>
    </section>`)
  }

  displayIngredientsInRecipeInfo(recipeObject, ingredientsSpan, instructionsSpan) {
    recipeObject.ingredients.forEach(ingredient => {
      ingredientsSpan.insertAdjacentHTML('afterbegin', `<ul><li>
    ${ingredient.quantity.amount.toFixed(2)} ${ingredient.quantity.unit}
    ${ingredient.name}</li></ul>`)
    })
    recipeObject.instructions.forEach(instruction => {
      instructionsSpan.insertAdjacentHTML('beforebegin', `<li>
    ${instruction.instruction}</li>`)
    })
  }

  displayTagsInRecipeInfo(recipeObject, tagsSpan) {
    recipeObject.tags.forEach(tag => {
      tagsSpan.insertAdjacentHTML('beforebegin', `<li>
        ${tag}</li>`);
    });
  }

  displayPantryHTML(user, cardArea) {
    cardArea.innerHTML = '';
    user.pantry.contents.forEach(ingredient => {
      let ingredientHtml = `<li> ${ingredient.name}, ${ingredient.amount.toFixed(2)} ${ingredient.unit}</li>`
      cardArea.insertAdjacentHTML("afterbegin", ingredientHtml);
    })
  }

  displayShoppingListToDOM(user, cardArea) {
    cardArea.innerHTML = '';
    user.shoppingList.forEach((ingredient) => {
      console.log(ingredient)
      let listHtml = `<li> ${ingredient.name}, $${(ingredient.estimatedCostInCents / 100).toFixed(2)} </li>`
      cardArea.insertAdjacentHTML('beforeend', listHtml)
    })
  }

  displayAddedMealsToDOM(user, cardArea, mealButton) {
    if (cardArea.classList.contains('all')) {
      cardArea.classList.remove('all');
    }
    if (!user.mealList.length) {
      mealButton.innerHTML = 'You have no meals yet';
    } else {
      cardArea.innerHTML = '';
    }
  }

  displayFavoritesOnDOM(user, cardArea, favButton) {
    if (cardArea.classList.contains('all')) {
      cardArea.classList.remove('all')
    }
    if (!user.favoriteRecipes.length) {
      favButton.innerHTML = 'You have no favorites!';
    } else {
      favButton.innerHTML = 'Refresh Favorites'
      cardArea.innerHTML = '';
    }
  }

  greetUserOnDOM(user, userName) {
    userName.innerHTML = user.name;
  }

  updateFavoriteIcon(favButton, user, specificRecipe, target) {
    if (!target.classList.contains('favorite-active')) {
      target.classList.add('favorite-active');
      favButton.innerHTML = 'View Favorites';
      user.addToFavorites(specificRecipe);
    } else if (target.classList.contains('favorite-active')) {
      target.classList.remove('favorite-active');
      user.removeFromFavorites(specificRecipe)
    }
  }

  
}
export default DomUpdates;