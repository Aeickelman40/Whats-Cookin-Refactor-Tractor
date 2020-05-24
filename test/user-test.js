/* eslint-disable max-len */
import { expect } from 'chai';

import User from '../src/user.js';
import recipeData from '../src/data/recipes.js';

describe('User', () => {

  let user1;

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

  it('Should be a function', () => {
    expect(User).to.be.a('function');
  });

  it('Should be an instance of a pantry', () => {
    expect(user1).to.be.an.instanceOf(User);
  });

  it('Should have a id, name and a pantry to reference', () => {
    expect(user1.id).to.eql(1);
    expect(user1.name).to.eql('Boba');
    expect(user1.pantry).to.eql([{'ingredient': 20081, 'amount': 1}, {'ingredient': 18372, 'amount': 1}, {'ingredient': 1123, 'amount': 3}]);
  })

  it('Should be able to have favoriteRecipes for each user', () => {
    expect(user1.favoriteRecipes).to.eql([]);
  });

  it('Should be able to add recipes to favoriteRecipes', () =>{
    user1.addToFavorites(recipeData[0]);
    
    expect(user1.favoriteRecipes).to.deep.eql([recipeData[0]]);
  });

  it('should throw an error if a new User has no user arguments', () => {
    expect(() => { new User() }).to.throw(Error);
	})

  it('Should not be able to add recipes to favorites if it is already there', () => {
    user1.addToFavorites(recipeData[0]);
    user1.addToFavorites(recipeData[1]);
    user1.addToFavorites(recipeData[0]);

    expect(user1.favoriteRecipes).to.deep.eql([recipeData[0], recipeData[1]]);
  })

  // it('Should give an Error when trying to add to favorites with no recipe arguement', () => {
  //   /// This test needs to be passed still
  //   expect(() => { user1.addToFavorites() }).to.throw(Error);
  // })

  it('Should be able to remove recipes from favoriteRecipes', () =>{
    user1.addToFavorites(recipeData[0]);
    expect(user1.favoriteRecipes).to.deep.eql([recipeData[0]]);
    
    user1.removeFromFavorites(recipeData[0]);
    expect(user1.favoriteRecipes).to.deep.eql([]);
  });

  // it('Should give an Error when trying to remove from favorites with no recipe arguement', () => {
  //   /// This test needs to be passed still
  //   expect(() => { user1.removeFromFavorites() }).to.throw(Error);
  // })

  it('Should be able to filter through favoriteRecipes by tag', () => {
    user1.addToFavorites(recipeData[0]);
    user1.addToFavorites(recipeData[1]);
    expect(user1.filterFavorites('antipasti')).to.eql([recipeData[0]]);
  });

  // it('Should give an Error when filtering with no recipe arguement', () => {
  //   /// This test needs to be passed still
  //   expect(() => { user1.filterFavorites() }).to.throw(Error);
  // })

  it('Should be able to search favoriteRecipes by name', () => {
    user1.addToFavorites(recipeData[0]);
    user1.addToFavorites(recipeData[1]);
    expect(user1.findFavorites('chip')).to.eql([recipeData[0]]);
  });

  it('Should be able to search favoriteRecipes by ingredient', () => {
    user1.addToFavorites(recipeData[0]);
    user1.addToFavorites(recipeData[1]);
    expect(user1.findFavorites('egg')).to.eql([recipeData[0]]);
  });
});
