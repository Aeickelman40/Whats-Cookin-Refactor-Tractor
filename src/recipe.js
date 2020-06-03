class Recipe {
  constructor(recipe, ingredientsData) {
    this.name = recipe.name;
    this.id = recipe.id;
    this.ingredients = recipe.ingredients;
    this.instructions = recipe.instructions;
    this.tags = recipe.tags;
    this.ingredientsData = ingredientsData;
    this.favorited = false;
  }

  calculateCost() {
    let costCounter = 0;
    this.ingredients.forEach(ingredient => {  
      this.ingredientsData.find(specificIngredient => {
        if (specificIngredient.id === ingredient.id) {
          costCounter += (Number(specificIngredient.estimatedCostInCents) *
          Number(ingredient.quantity.amount))

          // console.log('ingredient.quantity.amount', ingredient.quantity.amount)
          // console.log('specificIngredient.estimatedCostInCents', specificIngredient.estimatedCostInCents)
        }
      })
    });
    return costCounter;
  }
}

export default Recipe;
