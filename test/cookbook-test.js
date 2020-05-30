import {expect} from 'chai';


import recipeData from '../src/test-data/recipes-test-data';
import Cookbook from '../src/cookbook';

let cookbook;

describe('Cookbook', () => {
  beforeEach(() => {
    cookbook = new Cookbook(recipeData);
  });

  it('Should be a function', () => {
    expect(Cookbook).to.be.a('function');
  });

  it('Should be an instance of a pantry', () => {
    expect(cookbook).to.be.an.instanceOf(Cookbook);
  });

  it('Should have an array of all recipes', () => {
    expect(cookbook.recipes).to.be.an('array');
  });

  it('Should be able to filter through its array by ingredients', () => {
    expect(cookbook.findRecipe('yolk').length).to.equal(2);
  });

  it('Should be able to filter through its array by name', () => {
    expect(cookbook.findRecipe('Sesame Cookies').length).to.equal(1);
  });
});

