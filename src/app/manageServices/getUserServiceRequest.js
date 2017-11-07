'use strict';

const { getUserServiceRequest } = require('../../infrastructure/services/index');
const Account = require('../../infrastructure/account/index');

const action = async (req, res) => {
  const serviceId = req.params.service_id;
  const organisationId = req.params.org_id;
  const userId = req.params.uid;

  const userServiceRequest = await getUserServiceRequest(organisationId, serviceId, userId);

  const account = await Account.getById(userId);

  const returnValue = { ...userServiceRequest, ...account.claims };

  res.render('manageServices/views/serviceRequest', {
    ...returnValue,
  });
};

module.exports = action;
