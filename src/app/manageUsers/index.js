'use strict';

const express = require('express');
const router = express.Router({mergeParams: true});
const {isLoggedIn} = require('../../infrastructure/utils');
const logger = require('../../infrastructure/logger');
const manageUsers = require('./manageUsers');
const newUser = require('./newUser');

const rejectUnlessApprover = (req, res, next) => {
  if (res.locals.isApprover) {
    return next();
  }
  res.flash('error', 'You have been redirected here as you are not authorised to view the requested page');
  return res.status(302).redirect(`/`);
};

const routes = (csrf) => {
  logger.info('Mounting \'manage users\' routes');
  router.use(isLoggedIn);

  router.use(rejectUnlessApprover);

  router.get('/', manageUsers);
  router.get('/new', csrf, newUser);

  return router;
};

module.exports = routes;
