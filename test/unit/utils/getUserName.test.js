'use strict';

const {assert, expect} = require('chai');
const proxyquire = require('proxyquire');
const sinon = require('sinon');
const {getUserDisplayName} = require('../../../src/infrastructure/utils/index');

describe('When deriving a users display name', () => {
  it('should return first_name and given_name as a string', () => {
    let input = {given_name: 'Foo', family_name: 'Fighter'};
    let expected = "Foo Fighter";
    let actual = getUserDisplayName(input);
    expect(actual).to.equal(expected);
  });

  it('should return just the family name', () => {
      let input = { family_name: 'Fighter'};
      let expected = "Fighter";
      let actual = getUserDisplayName(input);
      expect(actual).to.equal(expected);
    });

  it('should return just the given name', () => {
    let input = { given_name: 'Foo'};
    let expected = "Foo";
    let actual = getUserDisplayName(input);
    expect(actual).to.equal(expected);
  });

  it('shuold return a trimmed display name', () => {
    let input = {given_name: '   Foo', family_name: 'Fighter   '};
    let expected = "Foo Fighter";
    let actual = getUserDisplayName(input);
    expect(actual).to.equal(expected);
  });

  it('shuold return an empty string if the user is not a valid object', () => {
    let input = {somthing: 'Foo', somthingelse: 'Fighter'};
    let expected = "";
    let actual = getUserDisplayName(input);
    expect(actual).to.equal(expected);
  });
});