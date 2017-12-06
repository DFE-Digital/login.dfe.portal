'use strict';

const { assert, expect } = require('chai');
const proxyquire = require('proxyquire');
const sinon = require('sinon');
// const {getUserDisplayName} = require('../../../src/infrastructure/utils/index');

describe('When deriving a users display name', () => {
  it.skip('should return first_name and given_name as a string', () => {
    const input = { given_name: 'Foo', family_name: 'Fighter' };
    const expected = 'Foo Fighter';
    const actual = getUserDisplayName(input);
    expect(actual).to.equal(expected);
  });

  it.skip('should return just the family name', () => {
    const input = { family_name: 'Fighter' };
    const expected = 'Fighter';
    const actual = getUserDisplayName(input);
    expect(actual).to.equal(expected);
  });

  it.skip('should return just the given name', () => {
    const input = { given_name: 'Foo' };
    const expected = 'Foo';
    const actual = getUserDisplayName(input);
    expect(actual).to.equal(expected);
  });

  it.skip('shuold return a trimmed display name', () => {
    const input = { given_name: '   Foo', family_name: 'Fighter   ' };
    const expected = 'Foo Fighter';
    const actual = getUserDisplayName(input);
    expect(actual).to.equal(expected);
  });

  it.skip('shuold return an empty string if the user is not a valid object', () => {
    const input = { somthing: 'Foo', somthingelse: 'Fighter' };
    const expected = '';
    const actual = getUserDisplayName(input);
    expect(actual).to.equal(expected);
  });
});
