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
    chai.spy.on(domUpdates, 'populateCardsHTML', () => {});
  });

  it('Should be a function', () => {
    expect(DomUpdates).to.be.a('function');
  });

  it('Should be an instance of a DomUpdates', () => {
    expect(domUpdates).to.be.an.instanceOf(DomUpdates);
  });

  it('Should call populateCardsHTML correctly', () => {
    domUpdates.populateCardsHTML(cardArea, recipeTestData[0]);
    expect(domUpdates.populateCardsHTML).to.have.been.called(1);
  });
});
