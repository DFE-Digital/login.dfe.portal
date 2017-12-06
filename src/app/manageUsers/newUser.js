'use strict';

const handler = (req, res) => {
  const viewModel = {
    csrfToken: req.csrfToken(),
    validationFailed: false,
    validationMessages: {
      email: '',
    },
  };
  res.render('manageUsers/views/newUser', viewModel);
};

module.exports = handler;
