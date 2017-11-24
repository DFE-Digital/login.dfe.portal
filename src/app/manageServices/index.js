'use strict';


const express = require('express');
const { isLoggedIn } = require('../../infrastructure/utils');
const logger = require('../../infrastructure/logger');
const viewService = require('./viewService');

const router = express.Router({ mergeParams: true });
const getUserServiceRequest = require('../manageServices/getUserServiceRequest');

const routes = (csrf) => {
  logger.info('Mounting \'manage services\' routes');

  router.use(isLoggedIn);
  router.get('/:org_id/services/:service_id', viewService);
  router.get('/:org_id/services/:service_id/service-request/:uid', getUserServiceRequest);

  return router;
};

module.exports = routes;
