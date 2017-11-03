class UserServiceRequest {
  constructor({ userService, organisation, service, role }) {
    this.userService = userService;
    this.organisation = organisation;
    this.service = service;
    this.role = role;
  }

}

module.exports = UserServiceRequest;
