'use strict';

const handler = (req, res) => {
  const viewModel = {
    csrfToken: req.csrfToken()
  };
  res.render('manageUsers/views/newUser', viewModel);
};

module.exports = handler;
