'use strict';

const express = require('express');
const uuid = require('uuid/v4');
const logger = require('../../infrastructure/logger');
const getIndex = require('./help');

const router = express.Router({ mergeParams: true });

const help = (csrf) => {
  logger.info('Mounting help routes');

  router.use('/', getIndex);

  return router;
};

module.exports = help;
