'use strict';
const {getUserDisplayName} = require('../../infrastructure/utils');

const home = (req, res) => {
  res.render('profile/views/profile', {
    displayName: req.user ? getUserDisplayName(req.user) : 'Unknown User',
    user: req.user
  });
};

module.exports = home;