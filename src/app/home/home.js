'use strict';
const {getUserDisplayName} = require('../../infrastructure/utils');

const home = (req, res) => {
  res.render('home/views/home', {
    displayName: req.user ? getUserDisplayName(req.user) : 'Unknown User',
    user: req.user
  });
};

module.exports = home;