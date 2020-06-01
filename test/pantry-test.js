/* eslint-disable no-undef */
/* eslint-disable max-len */
import { expect } from 'chai';

import Pantry from '../src/pantry.js';
import User from '../src/user.js';
import ingredientsTestData from '../src/test-data/ingredients-test-data.js';

describe('Pantry', () => {

  let user1, pantryContents, missingIngredientPantry, recipeIngredients, extraIngredientRecipe, missingIngredientsWithPrice;

  beforeEach(() => {
    extraIngredientRecipe = [{
      "name": "instant vanilla pudding mix",
      "id": 19206,
      "quantity": {
        "amount": 1,
        "unit": "Tbsp"
      }
    }]

    missingIngredientsWithPrice = [{
      "estimatedCostInCents": 660,
      "id": 19206,
      "name": "instant vanilla pudding mix"

    }]

    missingIngredientPantry = [{
      'ingredient': 19206,
      'amount': 1
    }]
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
      }])

    pantryContents = [
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
      }]

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
  });

  it('Should be a function', () => {
    expect(Pantry).to.be.a('function');
  });

  it('Should be an instance of a Pantry', () => {
    expect(user1.pantry).to.be.an.instanceOf(Pantry);
  });

  it('Should be able to hold pantry contents for a user', () => {

    expect(user1.pantry.contents).to.deep.equal(pantryContents);
  });

  it('Should give an Error if a new Pantry has the wrong user arguements', () => {
    expect(() => {
      new Pantry(aUser) 
    }).to.throw(Error);
  });
  
  it('Should be able to check ingredients in User/s pantry for a given recipe', () => {
    const checkIng = user1.pantry.checkRecipeStatus(recipeIngredients);

    expect(checkIng).to.eql('You have the ingredients!');
  });

  //   it.only('Should inform User if they lack required ingredients for a given recipe', () => {

  //     user1.pantry.checkRecipeStatus(extraIngredientRecipe)
  //     console.log(user1.pantry.checkPantry())
  //     expect(user1.pantry.checkPantry()).to.deep.eql(missingIngredientsWithPrice);
  //   });

  it('should be able to add missing Ingredients to a users pantry contents', () => {
    //user1.pantry.checkRecipeStatus(extraIngredientRecipe)
    //console.log(user1.pantry.contents)
    //user1.pantry.moveMissingIngredientsToContents()
    let totalPantry = user1.pantry.contents.concat(missingIngredientPantry)
    // console.log('user1.pantry.contents', user1.pantry.contents)
    // console.log('totalPantry', totalPantry)
    expect(user1.pantry.contents).to.deep.eql(totalPantry)
  });
})
