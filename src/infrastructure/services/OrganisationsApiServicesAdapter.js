const Service = require('./Service');
const jwtStrategy = require('login.dfe.jwt-strategies');
const config = require('./../config')();
const rp = require('request-promise');

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

module.exports = {
  getAvailableServicesForUser,
};
