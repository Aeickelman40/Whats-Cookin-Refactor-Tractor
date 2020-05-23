/* eslint-disable max-len */
import { expect } from 'chai';

import Pantry from '../src/pantry.js';
import User from '../src/user.js';
// import userPantryData from '../src/data/user.js';
import ingredientsData from '../src/data/ingredients.js';

let pantry, user1, recipeIngredients;

describe('Pantry', () => {
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

    pantry = new Pantry(ingredientsData, user1);
  });

  it('Should be a function', () => {
    expect(Pantry).to.be.a('function');
  });

  it('Should be an instance of a pantry', () => {
    expect(pantry).to.be.an.instanceOf(Pantry);
  });
  
  it('Should be able to check ingredients in User/s pantry for a given recipe', () => {
    expect(pantry.checkPantry(recipeIngredients)).to.eql('You have the ingredients!');
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
    
    expect(pantry.checkPantry(extraIngredientRecipe)).to.eql(missingIngredientsWithPrice);
  });
})
