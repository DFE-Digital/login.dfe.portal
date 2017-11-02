'use strict';
const listEndpoints = require('express-list-endpoints')

const devRoutes = require('./../devLauncher');
const userProfile = require('./../profile');
const changePassword = require('./../changePassword');
const portalHome = require('./../home');
const help = require('./../help');
const terms = require('./../terms');
const signOut = require('./../signOut');
const services = require('./../services');
const manageServices = require('./../manageServices');

const config = require('./../../infrastructure/config')();


const routes = (app, csrf) => {

  app.use('/', portalHome(csrf));
  app.use('/profile', userProfile(csrf));
  app.use('/change-password', changePassword(csrf));
  app.use('/help', help(csrf));
  app.use('/terms', terms(csrf));
  app.use('/signout', signOut(csrf));
  app.use('/services', services(csrf), manageServices(csrf));
  if(config.hostingEnvironment.showDevViews === 'true') app.use('/dev',devRoutes(csrf, listEndpoints(app)));
};

module.exports = routes;