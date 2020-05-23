import { expect } from 'chai';

import Pantry from '../src/pantry.js';
// import userPantryData from '../src/data/user.js';
import ingredientsData from '../src/data/ingredients.js';

let pantry;

describe('Pantry', () => {
  beforeEach(() => {

    pantry = new Pantry(ingredientsData);
  });

  it('Should be a function', () => {
    expect(Pantry).to.be.a('function');
  });

  it('Should be an instance of a pantry', () => {
      expect(pantry).to.be.an.instanceOf(Pantry);
  });
  
})
