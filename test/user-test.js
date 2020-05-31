/* eslint-disable max-len */
import { expect } from 'chai';
import users from '../src/test-data/users-test-data';
import User from '../src/user.js';
import Pantry from '../src/pantry.js';
import recipeTestData from '../src/test-data/recipes-test-data.js';

describe('User', () => {

  let user1;
  let userDemarcus;
  beforeEach(() => {
    let userId = 41;
    let newUser = users.find(user => {
      return user.id === Number(userId);
    });
    userDemarcus = new User(userId, newUser.name, newUser.pantry)
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
    expect(user1.pantry).to.be.an.instanceOf(Pantry);
  })

  it('Should be able to have favoriteRecipes for each user', () => {
    expect(user1.favoriteRecipes).to.eql([]);
  });

  it('Should be able to add recipes to favoriteRecipes', () =>{
    user1.addToFavorites(recipeData[0]);
    
    expect(user1.favoriteRecipes).to.deep.eql([recipeData[0]]);
  });

  it('should throw an error if a new User has no user arguments', () => {
    expect(() => { new User(aUser) }).to.throw(Error);
  })

  it('Should not be able to add recipes to favorites if it is already there', () => {
    user1.addToFavorites(recipeData[0]);
    user1.addToFavorites(recipeData[1]);
    user1.addToFavorites(recipeData[0]);

    expect(user1.favoriteRecipes).to.deep.eql([recipeData[0], recipeData[1]]);
  })

  it('Should give an Error when trying to add to favorites with no recipe arguement', () => {
    expect(() => { user1.addToFavorites(recipe) }).to.throw(Error);
  })

  it('Should be able to remove recipes from favoriteRecipes', () =>{
    user1.addToFavorites(recipeData[0]);
    expect(user1.favoriteRecipes).to.deep.eql([recipeData[0]]);
    
    user1.removeFromFavorites(recipeData[0]);
    expect(user1.favoriteRecipes).to.deep.eql([]);
  });

  it('Should give an Error when trying to remove from favorites with no recipe arguement', () => {
    expect(() => { user1.removeFromFavorites(recipe) }).to.throw(Error);
  })

  it('Should be able to filter through favoriteRecipes by tag', () => {
    user1.addToFavorites(recipeData[0]);
    user1.addToFavorites(recipeData[1]);
    expect(user1.filterFavorites('antipasti')).to.eql([recipeData[0]]);
  });

  it('Should give an Error when filtering with no recipe arguement', () => {
    expect(() => {
      user1.filterFavorites(tag) 
    }).to.throw(Error);
  })

  it('Should be able to search favoriteRecipes by name', () => {
    user1.addToFavorites(recipeData[0]);
    user1.addToFavorites(recipeData[1]);
    expect(user1.findFavorites('chip')).to.eql([recipeData[0]]);
  });

  it('Should start with an empty meal list', () => {
    expect(user1.mealList).to.eql([]);
  });

  it('Should be able to add a recipe to meal list', () => {
    //recipeData.forEach(recipe => console.log(recipe.name))
    userDemarcus.addToMealList(recipeData[48]);
    expect(userDemarcus.mealList).to.eql([recipeData[48]]);
  });

  it('Should set list to null if other data types are passed', () => {
    userDemarcus.addToMealList();
    userDemarcus.addToMealList('garbage');
    userDemarcus.addToMealList(4);
    expect(userDemarcus.mealList).to.eql([null, null, null]);
  });

  it('Should be able to search favoriteRecipes by ingredient', () => {
    user1.addToFavorites(recipeData[0]);
    user1.addToFavorites(recipeData[1]);
    expect(user1.findFavorites('egg')).to.eql([recipeData[0]]);
  });
});
