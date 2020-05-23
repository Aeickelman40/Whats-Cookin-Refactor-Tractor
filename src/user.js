import ingredientsData from "./data/ingredients";

class User {
  constructor(id, name, pantry) {
    this.id = id;
    this.name = name;
    this.pantry = pantry;
    this.favoriteRecipes = [];

  }

  addToFavorites(recipe) {
    if (!this.favoriteRecipes.includes(recipe)) {
      this.favoriteRecipes.push(recipe)
    }
  }

  removeFromFavorites(recipe) {
    const i = this.favoriteRecipes.indexOf(recipe);
    this.favoriteRecipes.splice(i, 1)
  }

  filterFavorites(tag) {
    return this.favoriteRecipes.filter(recipe => {
      return recipe.tags.includes(tag);
    });
  }

  findFavorites(strgToSrch) {
    return this.favoriteRecipes.filter(recipe => {
      return recipe.name.includes(strgToSrch)
      || recipe.ingredients.find(ingredient => {
        return ingredient.name.includes(strgToSrch)
      });
    });
  }

  checkPantry(recipeIngredients) {
    let counter = 0;
    let missingIngredients = []
    recipeIngredients.forEach(ingredient => {
      this.pantry.find(specificIngredient => {
        if (specificIngredient.ingredient === ingredient.id) {
          counter++
        } else {
          if (!missingIngredients.includes(ingredient)) {
            missingIngredients.push(ingredient)
          }
        }
      })
    })
    if (counter === recipeIngredients.length) {
      return 'You have the ingredients!'
    }
    missingIngredients.map(ingredient => {
      let tempEstimatedCost = ingredientsData.find(specificIngredient => {
        if (specificIngredient.id === ingredient.id) {
          return specificIngredient.estimatedCostInCents
        }
      })
      return {
        id : ingredient.id,
        name: ingredient.name,
        estimatedCostInCents: tempEstimatedCost
      }
    })
  }
}


  export default User;

