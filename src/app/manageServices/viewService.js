'use strict';

const { getServiceDetails, getServiceUsers } = require('./../../infrastructure/services');
const Account = require('./../../infrastructure/account');

const viewService = async (req, res) => {
  const serviceId = req.params.service_id;
  const organisationId = req.params.org_id;

  const userId = req.user.sub;

  const serviceDetails = await getServiceDetails(organisationId, serviceId);
  if (!serviceDetails) {
    res.status(404).send();
    return;
  }

  const serviceUsers = await getServiceUsers(organisationId, serviceId, userId);
  const expandedServiceUsers = await Promise.all(serviceUsers.map(async (serviceUser) => {
    const account = await Account.getById(serviceUser.id);
    return {
      id: serviceUser.id,
      name: account.name,
      role: serviceUser.role,
      status: serviceUser.status,
    };
  }));

  res.render('manageServices/views/viewService', {
    currentUserId: req.user.sub,
    // serviceName: serviceDetails.name,
    serviceDetails,
    serviceUsers: expandedServiceUsers,
  });
};

module.exports = viewService;
