'use strict';
const {getServiceDetails, getServiceUsers} = require('../../infrastructure/services');

const viewService = async (req, res) => {
  const serviceId = req.params.service_id;
  let userId = req.user.sub;
  const serviceDetails = await getServiceDetails(serviceId, userId);
  const serviceUsers = await getServiceUsers(serviceId, userId);

  res.render('manageServices/views/viewService', {
    currentUserId: req.user.sub,
    serviceName: serviceDetails.name,
    serviceUsers: serviceUsers
  });
};

module.exports = viewService;