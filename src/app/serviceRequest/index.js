'use strict';

const express = require('express');
const {isLoggedIn} = require('../../infrastructure/utils');
const logger = require('../../infrastructure/logger');
const router = express.Router({ mergeParams: true });
const getUserServiceRequest = require('./getUserServiceRequest');

const home = () => {
  logger.info('Mounting available services routes');

  router.get('/service-request', isLoggedIn, getUserServiceRequest);

  return router;
};

module.exports = home;
