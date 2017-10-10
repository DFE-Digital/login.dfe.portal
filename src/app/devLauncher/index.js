'use strict';

const express = require('express');
const uuid = require('uuid/v4');
const {isLoggedIn} = require('./../../utils');
const logger = require('../../logger');

const router = express.Router({ mergeParams: true });

module.exports = (csrf) => {
  logger.info('Mounting dev routed');

  router.get('/', isLoggedIn, (req, res) => {
    res.render('devLauncher/launchpad', {
      uuid: uuid(),
      user: req.user
    });
  });

  return router;
};
