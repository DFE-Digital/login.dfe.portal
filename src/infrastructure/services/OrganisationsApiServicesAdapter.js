const Service = require('./Service');
const Organisation = require('./Organisation');
const UserService = require('./UserServices');
const Role = require('./Role');
const jwtStrategy = require('login.dfe.jwt-strategies');
const config = require('./../config')();
const logger = require('./../logger');
const rp = require('request-promise');

const getAvailableServicesForUser = async (userId) => {
  const token = await jwtStrategy(config.organisations.service).getBearerToken();
  try {
    const services = await rp({
      uri: `${config.organisations.service.url}/services/unassociated-with-user/${userId}`,
      headers: {
        authorization: `Bearer ${token}`,
      },
      json: true,
    });
    return services.map(item => new Service(item));
  } catch (e) {
    logger.error(e);
  }
};

const getServicesForUser = async (userId) => {
  const token = await jwtStrategy(config.organisations.service).getBearerToken();
  try {
    const services = await rp({
      uri: `${config.organisations.service.url}/services/associated-with-user/${userId}`,
      headers: {
        authorization: `Bearer ${token}`,
      },
      json: true,
    });

    return services.map((item) => {
      return {
        service: new Service(item.service),
        organisation: new Organisation(item.organisation),
        userService: new UserService(item.userService),
        role: new Role(item.role),
      };
    });
  } catch (e) {
    logger.error(e);
  }
};

module.exports = {
  getAvailableServicesForUser,
  getServicesForUser,
};
