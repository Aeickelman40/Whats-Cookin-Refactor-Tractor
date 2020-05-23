import { expect } from 'chai';

import User from '../src/user.js';
import recipeData from '../src/data/recipes.js';

let user1
let recipeIngredients

describe('User', () => {
  beforeEach(() => {
    user1 = new User(1, 'Boba', [
      {
        'ingredient': 20081,
        'amount': 1
      },
      {
        'ingredient': 18372,
        'amount': 1
      },
      {
        'ingredient': 1123,
        'amount': 3
      }],

    recipeIngredients = [
      {
        name: 'all purpose flour',
        id: 20081,
        quantity: {
          amount: 1.5,
          unit: 'c'
        }
      },
      {
        name: 'baking soda',
        id: 18372,
        quantity: {
          amount: 0.5,
          unit: 'tsp'
        }
      },
      {
        name: 'egg',
        id: 1123,
        quantity: {
          amount: 1,
          unit: 'large'
        }
      }
    ]
    );
  });

  it('Should have a property of favoriteRecipes with a default value', () => {
    expect(user1.favoriteRecipes).to.eql([]);
  });

  it('Should be able to add recipes to favoriteRecipes', () =>{
    
    user1.addToFavorites(recipeData[0])
    expect(user1.favoriteRecipes.includes(recipeData[0])).to.eql(true);
  });

  it('Should be able to remove recipes from favoriteRecipes', () =>{
    user1.removeFromFavorites(recipeData);
    expect(user1.favoriteRecipes).to.eql([]);
  });

  it('Should be able to filter through favoriteRecipes by tag', () => {
    user1.addToFavorites(recipeData[0]);
    user1.addToFavorites(recipeData[1]);
    expect(user1.filterFavorites('antipasti')).to.eql([recipeData[0]]);
  });

  it('Should be able to search favoriteRecipes by name or ingredient', () => {
    user1.addToFavorites(recipeData[0]);
    user1.addToFavorites(recipeData[1]);
    expect(user1.findFavorites('egg')).to.eql([recipeData[0]]);
  });

  it('Should be able to check ingredients in User/s pantry for a given recipe', () => {
    expect(user1.checkPantry(recipeIngredients)).to.eql('You have the ingredients!');
  });

  it('Should inform User if they lack required ingredients for a given recipe', () => {
    let extraIngredientRecipe = [{
      "name": "instant vanilla pudding mix",
      "id": 19206,
      "quantity": {
        "amount": 1,
        "unit": "Tbsp"
      }
    }]

    let missingIngredientsWithPrice = [{
      "id": 19206,
      "name": "instant vanilla pudding mix",
      "estimatedCostInCents": 660
    }]    
    
    expect(user1.checkPantry(extraIngredientRecipe)).to.eql(missingIngredientsWithPrice);
  });
});
