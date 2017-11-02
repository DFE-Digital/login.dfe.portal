'use strict';

const { getAvailableServicesForUser, getServiceUsers } = require('./../../infrastructure/services');
const Account = require('./../../infrastructure/account');

const viewService = async (req, res) => {
  const serviceId = req.params.service_id;
  const userId = req.user.sub;

  const availableServices = await getAvailableServicesForUser(userId);
  const serviceDetails = availableServices.find((e) => e.id === serviceId);
  if (!serviceDetails) {
    res.status(404).send();
  }

  const serviceUsers = await getServiceUsers(serviceId, userId);
  const expandedServiceUsers = await Promise.all(serviceUsers.map(async (serviceUser) => {
    const account = await Account.getById(serviceUser.id);
    return {
      id: serviceUser.id,
      name: account.name,
      role: serviceUser.role,
    };
  }));

  res.render('manageServices/views/viewService', {
    currentUserId: req.user.sub,
    serviceName: serviceDetails.name,
    serviceUsers: expandedServiceUsers,
  });
};

module.exports = viewService;