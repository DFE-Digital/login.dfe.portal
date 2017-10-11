'use strict';

const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) {
    return next();
  }
  return res.status(302).redirect('/auth');
};

const getUserDisplayName = (user) => {
  return `${user.given_name} ${user.family_name}`;
};

module.exports = {isLoggedIn, getUserDisplayName};