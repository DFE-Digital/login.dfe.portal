'use strict';


const devRoutes = require('./../devLauncher');
const userProfile = require('./../profile');
const changePassword = require('./../changePassword');
const portalHome = require('./../home');
const help = require('./../help');
const terms = require('./../terms');
const signOut = require('./../signOut');
const services = require('./../services');
const manageServices = require('./../manageServices');
const manageUsers = require('./../manageUsers');
const {setUserContext, setApproverContext, asyncMiddleware} = require('../../infrastructure/utils');
const config = require('./../../infrastructure/config')();

const routes = (app, csrf) => {
  app.use(setUserContext);
  app.use(asyncMiddleware(setApproverContext));

  app.use('/', portalHome(csrf));
  app.use('/profile', userProfile(csrf));
  app.use('/change-password', changePassword(csrf));
  app.use('/help', help(csrf));
  app.use('/terms', terms(csrf));
  app.use('/signout', signOut(csrf));
  app.use('/services', services(csrf));
  app.use('/organisations', manageServices(csrf));
  app.use('/users', manageUsers(csrf));

  if (config.hostingEnvironment.useDevViews === true) app.use('/dev', devRoutes(csrf, app));
};

module.exports = routes;
