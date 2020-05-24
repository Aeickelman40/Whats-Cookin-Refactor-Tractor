/* eslint-disable max-len */
import { expect } from 'chai';

import User from '../src/user.js';
import recipeData from '../src/data/recipes.js';

let user1;

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
      }]);
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


});