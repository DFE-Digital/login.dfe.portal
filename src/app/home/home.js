'use strict';

const { getUserDisplayName } = require('../../infrastructure/utils');
const { getServicesForUser } = require('../../infrastructure/services');
const {groupBy, keys} = require('lodash');

const home = async (req, res) => {
  const myServices = await getServicesForUser(req.user.sub);
  const myServicesByOrganisation = groupBy(myServices, (s) => s.organisation.id)
  const myOrganisartions = keys(myServicesByOrganisation);
  res.render('home/views/home', {
      title: 'Access DfE services',
    myServicesByOrganisation,
    myOrganisartions
  });
};

module.exports = home;
