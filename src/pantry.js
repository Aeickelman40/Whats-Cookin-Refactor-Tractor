import ingredientsData from "./data/ingredients";
class Pantry {
  constructor(userIngredients, user) {
    this.contents = userIngredients;
    this.user = user;
  }
  checkPantry(recipeIngredients) {
    let counter = 0;
    let missingIngredients = [];
    recipeIngredients.forEach(recipeIngredient => {
      this.user.pantry.forEach(pantryItem => {
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
      ingredientsData.find(specificIngredient => {
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

