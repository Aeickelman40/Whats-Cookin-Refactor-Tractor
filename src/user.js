/* eslint-disable max-len */

import Pantry from "./pantry";

class User {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.pantry = new Pantry(this);
    this.favoriteRecipes = [];
    this.mealList = [];
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
  addToMealList(recipe) {
    console.log(this.pantry)
    console.log(this.pantry.checkPantry(recipe.ingredients))
    if (!this.mealList.includes(recipe)) {
      typeof recipe === 'object' ? this.mealList.push(recipe) : this.mealList.push(null);
    }
  }

}


export default User;

