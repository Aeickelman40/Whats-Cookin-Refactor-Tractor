import ingredientsData from "./data/ingredients";
import data from "./scripts";
class Pantry {
  constructor(user, contents) {
    this.user = user;
    this.contents = contents;
  }
  checkPantry(recipeIngredients) {
// Break down into smaller functions, this could maybe be a helper function

    let counter = 0;
    let missingIngredients = [];
    recipeIngredients.forEach(recipeIngredient => {
      this.user.pantry.contents.forEach(pantryItem => {
        if (pantryItem.ingredient === recipeIngredient.id) {
          counter ++;
        } else {
          if (!missingIngredients.includes(recipeIngredient)) {
            missingIngredients.push(recipeIngredient);
          }
        }
      })
    })
    if (counter === recipeIngredients.length) {
      return 'You have the ingredients!';
    }
    return missingIngredients.map(ingredient => {
      let tempEstimatedCost;
      data.ingredientsData.find(specificIngredient => {
        if (specificIngredient.id === ingredient.id) {
          tempEstimatedCost = specificIngredient.estimatedCostInCents
        }
      })
      return {
        id: ingredient.id,
        name: ingredient.name,
        estimatedCostInCents: tempEstimatedCost
      }
    })
  }
}

export default Pantry;


