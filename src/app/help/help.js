"use strict";
const {getUserDisplayName} = require('../../infrastructure/utils');

const help = (req, res, next) => {
  res.render('help/view/help', {
    displayName: req.user ? getUserDisplayName(req.user) : 'Unknown User',
    user: req.user
  });
};

module.exports = help;