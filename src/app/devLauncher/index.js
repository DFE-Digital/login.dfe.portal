'use strict';

const express = require('express');
const uuid = require('uuid/v4');
const {isLoggedIn} = require('../../infrastructure/utils');
const logger = require('../../infrastructure/logger');

const router = express.Router({ mergeParams: true });

const devLauncher = (csrf) => {
  logger.info('Mounting dev routed');

  router.get('/', isLoggedIn, (req, res) => {
    res.render('devLauncher/views/launchpad', {
      uuid: uuid(),
      user: req.user
    });
  });

  return router;
};

module.exports = devLauncher;