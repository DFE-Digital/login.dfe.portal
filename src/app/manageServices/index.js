'use strict';


const express = require('express');
const {isLoggedIn} = require('../../infrastructure/utils');
const logger = require('../../infrastructure/logger');
const viewService = require('./viewService');
const router = express.Router({ mergeParams: true });

const routes = (csrf) => {
  logger.info('Mounting \'manage services\' routes');

  router.use(isLoggedIn);
  router.get('/:service_id', viewService);

  return router;
};

module.exports = routes;