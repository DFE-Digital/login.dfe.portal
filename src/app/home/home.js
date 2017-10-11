'use strict';
const {getUserDisplayName} = require('../../infrastructure/utils');

const home = (req, res) => {
  res.render('home/views/home', {
    displayName: req.user ? getUserDisplayName(req.user) : 'Unknown User'
  });
};

module.exports = home;