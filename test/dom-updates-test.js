const chai = require('chai');
import { expect } from 'chai';
import DomUpdates from '../src/DomUpdates';
const spies = require('chai-spies');
chai.use(spies);

let domUpdates;

describe('DomUpdates', () => {
  beforeEach(() => {
    domUpdates = new DomUpdates();
  });

  it('Should be a function', () => {
    expect(DomUpdates).to.be.a('function');
  });

  it('Should be an instance of a DomUpdates', () => {
    expect(domUpdates).to.be.an.instanceOf(DomUpdates);
  });

  it.skip('Should have an array of all recipes', () => {
    expect(cookbook.recipes).to.be.an('array');
  });

  it.skip('Should be able to filter through its array by ingredients', () => {
    expect(cookbook.findRecipe('yolk').length).to.equal(2);
  });

  it.skip('Should be able to filter through its array by name', () => {
    expect(cookbook.findRecipe('Sesame Cookies').length).to.equal(1);
  });
});
