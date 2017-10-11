'use strict';

const express = require('express');
const expressLayouts = require('express-ejs-layouts');


const expressAppWithViews = (viewPath) => {
  let app = express();
  app.use(expressLayouts);
  app.set('view engine', 'ejs');
  app.set('views', viewPath);
  app.set('layout', 'layouts/layout');
  return app;
};

const expressAuthenticationStub = (authenticated, extras) => {
  const middleware = (req, res, next) => {
    req.isAuthenticated = () => {
      return authenticated;
    };
    Object.assign(req, extras);
    req.user = {};
    next();
  };

  return middleware;
};

module.exports = {
  expressAppWithViews,
  expressAuthenticationStub
};

