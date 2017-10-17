'use strict';

const path = require('path');
const chai = require('chai');
const request = require('supertest');
const {describe, it, beforeEach} = require('mocha');
const {expect} = chai;
const {expressAppWithViews, expressAuthenticationStub} = require('./../../utils');
let app;

describe('Integration tests for', () => {
  describe('profile functional area ', () => {
    beforeEach(() => {
      process.env.settings = `config/login.dfe.portal.dev.json`;
      app = expressAppWithViews(path.resolve(__dirname, '../../../', 'src/app/'))
    });
    describe('as an authenticated user', () => {
      beforeEach(() => {
        process.env.settings = `config/login.dfe.portal.dev.json`;
        app.use(expressAuthenticationStub(true, {user: {}}));
      });

      it('Get / should return status 200', async () => {
        const profile = require('../../../src/app/profile/index');
        app.use('/', profile(null));
        const response = await request(app).get('/');
        expect(response.statusCode).to.equal(200);
      });
    });
    describe('as an unauthenticated user', () => {
      beforeEach(() => {
        process.env.settings = `config/login.dfe.portal.dev.json`;
        app.use(expressAuthenticationStub(false, {user: {}, session: {redirectUrl: '/'}}));
      });
      it('Get / path should return status 302', async () => {
        const profile = require('../../../src/app/profile/index');
        app.use('/', profile(null));

        const response = await request(app).get('/');
        expect(response.statusCode).to.equal(302);
      });
    });
  });
});