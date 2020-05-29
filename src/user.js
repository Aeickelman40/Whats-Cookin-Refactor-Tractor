import Pantry from './pantry';
import Recipe from './recipe';

class User {
  constructor(id, name, contents) {
    this.id = id;
    this.name = name;
    this.pantry = new Pantry (this, contents);
    this.favoriteRecipes = [];
    this.mealList = [];
    this.shoppingList = [];
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

    if (typeof recipe !== 'object') {
      this.mealList.push(null);
      return;
    } else if (!this.mealList.includes(recipe) && this.pantry.checkRecipeStatus(recipe.ingredients) === 'You have the ingredients!') {
      this.mealList.push(recipe);
      console.log(this.mealList);
    } else if (!this.mealList.includes(recipe)) {
      let tempIngredients = this.pantry.checkPantry();
      console.log( 'tempIngredients', tempIngredients)
      let newIngredients = this.shoppingList.concat(tempIngredients);
      let uniqIngredients = [...new Set(newIngredients)];
      this.shoppingList = uniqIngredients;
      console.log(this.shoppingList)
    }
  }
}


export default User;

