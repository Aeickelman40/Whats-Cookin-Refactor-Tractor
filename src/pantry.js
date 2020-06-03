
class Pantry {
  constructor(contents, data) {
    this.data = data;
    this.contents = contents;
    this.missingIngredients = [];
  }

  checkPantry() {
    return this.missingIngredients.map(ingredient => {
      let tempEstimatedCost = this.data.ingredientsData.find(specificIngredient => {
        return specificIngredient.id === ingredient.id
      }).estimatedCostInCents
      return this.translateIngredient(tempEstimatedCost, ingredient);
    })
  }

  translateIngredient(tempEstimatedCost, ingredient) {
    return {
      estimatedCostInCents: tempEstimatedCost,
      id: ingredient.id,
      name: ingredient.name
    }
  }

  checkRecipeStatus(recipeIngredients) {
    let counter = 0;
    recipeIngredients.forEach(recipeIngredient => {
      this.contents.forEach(pantryItem => {
        if (pantryItem.ingredient === recipeIngredient.id) {
          counter++;
        }
      })
    })
    if (counter === recipeIngredients.length) {
      return 'You have the ingredients!';
    }
    recipeIngredients.forEach(recipeIngredient => {
      if (!this.missingIngredients.includes(recipeIngredient)) {
        this.missingIngredients.push(recipeIngredient);
      }
    })
  }

  moveMissingIngredientsToContents(user) {
    this.contents = this.contents.concat(user.translatedShoppingList);
    this.missingIngredients = [];
    user.translatedShoppingList = [];
  }
}

export default Pantry;
