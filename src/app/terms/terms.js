'use strict';
const {getUserDisplayName} = require('../../infrastructure/utils');

const profile = (req, res) => {
  res.render('terms/views/terms', {
    displayName: req.user ? getUserDisplayName(req.user) : 'Unknown User',
    user: req.user
  });
};

module.exports = profile;