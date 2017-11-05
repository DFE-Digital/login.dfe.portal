'use strict';

const { getUserDisplayName } = require('../../infrastructure/utils');
const { getAvailableServicesForUser } = require('../../infrastructure/services');
const {groupBy, keys} = require('lodash');

const home = async (req, res) => {
  const myServices = await getAvailableServicesForUser(req.user.sub);
  const myServicesByOrganisation = groupBy(myServices, (s) => s.organisation.id)
  const myOrganisartions = keys(myServicesByOrganisation);
  res.render('home/views/home', {
    displayName: req.user ? getUserDisplayName(req.user) : 'Unknown User',
    user: req.user,
      title: 'Access DfE services',
    myServicesByOrganisation,
    myOrganisartions
  });
};

module.exports = home;
