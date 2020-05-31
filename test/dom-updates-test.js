const chai = require('chai');
import { expect } from 'chai';
import DomUpdates from '../src/DomUpdates';
import recipeTestData from '../src/test-data/recipes-test-data'
const spies = require('chai-spies');
chai.use(spies);
let domUpdates;
let cardArea;

describe('DomUpdates', () => {
  beforeEach(() => {
    domUpdates = new DomUpdates();
    global.document = {};
    chai.spy.on(document, ['insertAdjacentHTML'], () => {});
    //cardArea = document.querySelector('.all-cards')
  });

  it('Should be a function', () => {
    expect(DomUpdates).to.be.a('function');
  });

  it('Should be an instance of a DomUpdates', () => {
    expect(domUpdates).to.be.an.instanceOf(DomUpdates);
  });

  it.skip('Should call insertAdjacentHTML correctly', () => {
    domUpdates.populateCardsHTML(cardArea, recipeTestData[0]);
    expect(document.insertAdjacentHTML).to.have.been.called(1);
  });

  it.skip('Should be able to filter through its array by ingredients', () => {
    expect(cookbook.findRecipe('yolk').length).to.equal(2);
  });

  it.skip('Should be able to filter through its array by name', () => {
    expect(cookbook.findRecipe('Sesame Cookies').length).to.equal(1);
  });
});
