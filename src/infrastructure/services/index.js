const config = require('./../config')();

let adapter;
if(config.organisations.type.toLowerCase() === 'organisationsapi') {
  adapter = require('./OrganisationsApiServicesAdapter');
} else {
  adapter = require('./StaticServicesAdapter');
}
module.exports = adapter;