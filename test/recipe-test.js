import { expect } from 'chai';

import Recipe from '../src/recipe.js';
import recipeData from '../src/data/recipes.js';
import ingredientsData from '../src/data/ingredients.js';

describe('Recipe', () => {

  let recipe;

  beforeEach(() => {
    recipe = new Recipe(recipeData[0], ingredientsData);
  });

  it('Should be a function', () => {
    expect(Recipe).to.be.a('function');
  });

  it('Should be an instance of a pantry', () => {
    expect(recipe).to.be.an.instanceOf(Recipe);
  });

  it('Should hold its own recipe name', () => {
    expect(recipe.name).to.equal('Loaded Chocolate Chip Pudding Cookie Cups');
  });

  it('Should hold its own recipe ID', () => {
    expect(recipe.id).to.equal(595736);
  });

  it('Should have ingredients needed', () => {
    expect(recipe.ingredients).to.equal(recipeData[0].ingredients);
  });

  it('Should have instructions for the recipe', () => {
    expect(recipe.instructions).to.equal(recipeData[0].instructions);
  });

  it('Should have tags that the recipe falls under', () => {
    expect(recipe.tags).to.equal(recipeData[0].tags);
  });

  it('Should hold ingredient data', () => {
    expect(recipe.ingredientsData).to.equal(ingredientsData);
  });

  it('Should be able to calculate the cost of its ingredients', () => {
    expect(recipe.calculateCost()).to.equal(17776);
  });

})


