'use strict';

const { getServicesForUser } = require('../../infrastructure/services');
const { groupBy, keys } = require('lodash');

const home = async (req, res) => {
  const myServices = await getServicesForUser(req.user.sub);
  const myServicesByOrganisations = groupBy(myServices, s => s.organisation.id);
  const myOrganisations = keys(myServicesByOrganisations);
  res.render('home/views/home', {
    title: 'Access DfE services',
    myServicesByOrganisations,
    myOrganisations,
  });
};

module.exports = home;
