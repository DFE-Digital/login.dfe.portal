'use strict';

const express = require('express');
const uuid = require('uuid/v4');
const {isLoggedIn, getUserDisplayName} = require('../../infrastructure/utils');
const logger = require('../../infrastructure/logger');

const router = express.Router({ mergeParams: true });

const home = (csrf) => {
  logger.info('Mounting home routes');

  router.get('/', isLoggedIn, (req, res) => {
    res.render('home/views/index', {
      uuid: uuid(),
      displayName: req.user ? getUserDisplayName(req.user) : 'Unknown User'
    });
  });

  return router;
};

module.exports = home;
