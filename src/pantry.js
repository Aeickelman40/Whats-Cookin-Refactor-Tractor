
class Pantry {
  constructor(contents, data) {
    this.data = data;
    this.contents = contents;
    this.missingIngredients = []
  }


  checkPantry() {
    return this.missingIngredients.map(ingredient => {
      let tempEstimatedCost;
      this.data.ingredientsData.find(specificIngredient => {
        if (specificIngredient.id === ingredient.id) {
          tempEstimatedCost = specificIngredient.estimatedCostInCents
        }
      })
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
        } else if (!this.missingIngredients.includes(recipeIngredient)) {
          this.missingIngredients.push(recipeIngredient);
        }
      })
    })
    if (counter === recipeIngredients.length) {
      return 'You have the ingredients!';
    }
  }

  moveMissingIngredientsToContents() {
    this.contents = this.contents.concat(this.missingIngredients);
    this.missingIngredients = [];
  }
}

export default Pantry;


