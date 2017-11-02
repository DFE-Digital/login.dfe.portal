'use strict';

const { getUserDisplayName } = require('../../infrastructure/utils');
const { getServicesForUser } = require('../../infrastructure/services');

const home = async (req, res) => {
  const myServices = await getServicesForUser(req.user.sub);
  res.render('home/views/home', {
    displayName: req.user ? getUserDisplayName(req.user) : 'Unknown User',
    user: req.user,
      title: 'Access DfE services',
    myServices,
  });
};

module.exports = home;
