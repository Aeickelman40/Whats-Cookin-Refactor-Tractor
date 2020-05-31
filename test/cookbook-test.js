import {expect} from 'chai';


import recipeTestData from '../src/test-data/recipes-test-data';
import Cookbook from '../src/cookbook';

let cookbook;

describe('Cookbook', () => {
  beforeEach(() => {
    cookbook = new Cookbook(recipeTestData);
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
    expect(cookbook.findRecipe('egg').length).to.equal(1);
  });

  it('Should be able to filter through its array by name', () => {
    expect(cookbook.findRecipe('Loaded Chocolate Chip Pudding Cookie Cups').length).to.equal(1);
  });
});

