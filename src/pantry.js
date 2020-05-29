
import data from "./scripts";
class Pantry {
  constructor(user, contents) {
    this.user = user;
    this.contents = contents;
    this.counter = 0;
    this.missingIngredients = [];
  }
  checkPantry(recipeIngredients) {
  // Break down into smaller functions, this could maybe be a helper function

    console.log('this.missingIngredients', this.missingIngredients);
    if (this.checkRecipeStatus()) {
      this.user.mealList.push(recipe)
    }
    this.findIngredient(recipeIngredients)
    return this.missingIngredients.map(ingredient => {
      let tempEstimatedCost;
      data.ingredientsData.find(specificIngredient => {
        if (specificIngredient.id === ingredient.id) {
          tempEstimatedCost = specificIngredient.estimatedCostInCents
        }
      })
      return {
        id: ingredient.id,
        name: ingredient.name,
        estimatedCostInCents: tempEstimatedCost,
        unit: ingredient.quantity.unit
      }
    })

  }
  findIngredient(recipeIngredients) {
    let counter = 0;
    recipeIngredients.forEach(recipeIngredient => {
      this.user.pantry.contents.forEach(pantryItem => {
        if (pantryItem.ingredient === recipeIngredient.id) {
          this.counter++;
        } else if (!this.missingIngredients.includes(recipeIngredient)) {
          this.missingIngredients.push(recipeIngredient);
        }
  
      })
    })
 
    return this.missingIngredients;
  }

  checkRecipeStatus(recipeIngredients) {
    if (this.counter === recipeIngredients.length + 1) {
      
      //window.alert('You have the ingredients!');
      return true;
    } else {
      //window.alert(`You don't have enough ingredients, check your shopping list!`);
    }
  }
}

export default Pantry;


