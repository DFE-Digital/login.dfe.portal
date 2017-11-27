'use strict';

const { getServicesForUser } = require('../../infrastructure/services');
const { groupBy, keys } = require('lodash');

const home = async (req, res) => {
  const myServices = await getServicesForUser(req.user.sub);
  const myServicesByOrganisations = groupBy(myServices.filter(e => e.status === 1), s => s.organisation.id);
  const myPendingServicesByOrganisations = groupBy(myServices.filter(e => e.status !== 1), s => s.organisation.id);
  const myOrganisations = keys(myServicesByOrganisations);
  const myPendingOrganisations = keys(myPendingServicesByOrganisations);
  res.render('home/views/home', {
    title: 'Access DfE services',
    myServicesByOrganisations,
    myPendingServicesByOrganisations,
    myOrganisations,
    myPendingOrganisations,
  });
};

module.exports = home;
