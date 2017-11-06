'use strict';

const { getUserServiceRequest } = require('./../../infrastructure/services');
const Account = require('./../../infrastructure/account');

const action = async (req, res) => {
  const userServiceRequest = await getUserServiceRequest(req.params.usid);

  const account = await Account.getById(userServiceRequest.userService.user_id);

  userServiceRequest.Account = account;

  res.render('services/views/serviceRequest', {
    userServiceRequest,
  });
};

module.exports = action;
