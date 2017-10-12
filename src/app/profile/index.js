'use strict';

const express = require('express');
const uuid = require('uuid/v4');
const {isLoggedIn} = require('../../infrastructure/utils');
const logger = require('../../infrastructure/logger');
const getIndex = require('./profile');
const router = express.Router({ mergeParams: true });

const home = (csrf) => {
  logger.info('Mounting home routes');

  router.get('/', isLoggedIn, getIndex);

  return router;
};

module.exports = home;
