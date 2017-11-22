'use strict';


const express = require('express');
const {isLoggedIn} = require('../../infrastructure/utils');
const logger = require('../../infrastructure/logger');
const manageUsers = require('./manageUsers');
const router = express.Router({ mergeParams: true });



const routes =  (csrf) => {
  logger.info('Mounting \'manage users\' routes');
  router.use(isLoggedIn);


  router.get('/', manageUsers);

  return router;
};

module.exports = routes;