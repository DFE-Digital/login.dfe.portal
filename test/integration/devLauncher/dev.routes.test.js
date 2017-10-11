"use strict";
const path = require('path');
const chai = require('chai');
const request = require('supertest');
const {describe, it, beforeEach} = require('mocha');
const {expect} = chai;
const {expressAppWithViews, expressAuthenticationStub} = require('./../../utils');

let app;

describe('Integration tests for', () => {
  describe('DevLauncher functional area ', () => {
    beforeEach(() => {
      process.env.settings = `config/login.dfe.portal.dev.json`;
      app = expressAppWithViews(path.resolve(__dirname, '../../../', 'src/app/'));

    });
    describe('as an authenticated user', () => {
      beforeEach(() => {
        process.env.settings = `config/login.dfe.portal.dev.json`;
        app.use(expressAuthenticationStub(true, {user: {}}));
      });

      it('Get / should return status 200', async () => {
        const dev = require('../../../src/app/devLauncher/index');
        app.use('/', dev(null));
        let response = await request(app).get('/');
        expect(response.statusCode).to.equal(200);
      });
    });
    describe('as an unauthenticated user', () => {
      beforeEach(() => {
        process.env.settings = `config/login.dfe.portal.dev.json`;
        app.use(expressAuthenticationStub(false, {user: {}, session: {redirectUrl: '/'}}));
      });

      it('Get / path should return status 302', async () => {
        const dev = require('../../../src/app/devLauncher/index');
        app.use('/', dev(null));

        let response = await request(app).get('/');
        expect(response.statusCode).to.equal(302);
      });
    });
  });
});