'use strict';

const { emailPolicy } = require('login.dfe.validation');

const validate = (email) => {
  const messages = {
    email: '',
  };
  let failed = false;

  if (!emailPolicy.doesEmailMeetPolicy(email)) {
    messages.email = 'Please enter a valid email address';
    failed = true;
  }

  return {
    failed,
    messages,
  }
};

const handler = async (req, res) =>  {


  const email = req.body.email;
  const validationResult = validate(email);

  await


  if (validationResult.validationFailed) {
    const viewModel = {
      csrfToken: req.csrfToken(),
      validationMessages: validationResult.messages,
      validationFailed: true,
    };
    res.render('manageUsers/views/newUser', viewModel);
  }



};

module.exports = handler;
