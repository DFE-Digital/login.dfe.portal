const Service = require('./Service');
const jwtStrategy = require('login.dfe.jwt-strategies');
const config = require('./../config')();
const rp = require('request-promise');
const ServiceUser = require('./ServiceUser');

const getAvailableServicesForUser = async (userId) => {
  const token = await jwtStrategy(config.organisations.service).getBearerToken();
  const services = await rp({
    uri: `${config.organisations.service.url}/services/unassociated-with-user/${userId}`,
    headers: {
      authorization: `Bearer ${token}`,
    },
    json: true,
  });
  return services.map(item => new Service(item));
};

const getServiceDetails = async (serviceId) => {
  const token = await jwtStrategy(config.organisations.service).getBearerToken();
  const service = await rp({
    uri: `${config.organisations.service.url}/services/${serviceId}`,
    headers: {
      authorization: `Bearer ${token}`,
    },
    json: true,
  });
  return new Service(service);
};

const getServiceUsers = async (serviceId) => {
  const token = await jwtStrategy(config.organisations.service).getBearerToken();
  const users = await rp({
    uri: `${config.organisations.service.url}/services/${serviceId}/users`,
    headers: {
      authorization: `Bearer ${token}`,
    },
    json: true,
  });
  return users.map(item => new ServiceUser(item));
};

module.exports = {
  getAvailableServicesForUser,
  getServiceDetails,
  getServiceUsers,
};
