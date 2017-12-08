'use strict';

const path = require('path');
const request = require('supertest');
const { expressAppWithViews, expressAuthenticationStub } = require('./../../utils');

let app;

describe('Integration tests for', () => {
  describe('profile functional area ', () => {
    beforeEach(() => {
      process.env.settings = 'config/login.dfe.portal.dev.json';
      app = expressAppWithViews(path.resolve(__dirname, '../../../', 'src/app/'));
      app.locals.title = 'Test Title';
    });
    describe('as an authenticated user', () => {
      beforeEach(() => {
        process.env.settings = 'config/login.dfe.portal.dev.json';
        app.use(expressAuthenticationStub(true, { user: {} }));
      });

      it('Get / should return status 200', async () => {
        const profile = require('../../../src/app/profile/index');
        app.use('/', profile(null));
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
      });
    });
    describe('as an unauthenticated user', () => {
      beforeEach(() => {
        process.env.settings = 'config/login.dfe.portal.dev.json';
        app.use(expressAuthenticationStub(false, { user: {}, session: { redirectUrl: '/' } }));
      });
      it('Get / path should return status 302', async () => {
        const profile = require('../../../src/app/profile/index');
        app.use('/', profile(null));

        const response = await request(app).get('/');
        expect(response.statusCode).toBe(302);
      });
    });
  });
});
