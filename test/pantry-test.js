/* eslint-disable max-len */
import { expect } from 'chai';

import Pantry from '../src/pantry.js';
import User from '../src/user.js';
// import userPantryData from '../src/data/user.js';
import ingredientsTestData from '../src/test-data/ingredients-test-data.js';

describe('Pantry', () => {

  let pantry, user1, recipeIngredients;

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
      }])
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

    pantry = new Pantry(user1, user1[2]);
  });

  it('Should be a function', () => {
    expect(Pantry).to.be.a('function');
  });

  it('Should be an instance of a Pantry', () => {
    expect(pantry).to.be.an.instanceOf(Pantry);
  });

  it('Should be able to hold user data', () => {
    expect(pantry.user).to.equal(user1);
  });

  it('Should be able to hold user data', () => {
    expect(pantry.contents).to.deep.equal(user1[2]);
  });

  it('Should give an Error if a new Pantry has the wrong user arguements', () => {
    expect(() => {
      new Pantry(aUser) 
    }).to.throw(Error);
  });
  
  it('Should be able to check ingredients in User/s pantry for a given recipe', () => {
    const checkIng = pantry.checkRecipeStatus(recipeIngredients);

    expect(checkIng).to.eql('You have the ingredients!');
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
      "estimatedCostInCents": 660,
      "id": 19206,
      "name": "instant vanilla pudding mix"
 
    }]

    pantry.checkPantry();
    console.log(pantry.missingIngredients)
    expect(pantry.missingIngredients).to.deep.eql(missingIngredientsWithPrice);
  });

  it('If no recipe ingredients are given then the method checkPantry should give an Error', () => {
    expect(() => {
      pantry.checkPantry() 
    }).to.throw(Error);
  });
})
