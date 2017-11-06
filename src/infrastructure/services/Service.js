class Service {
  constructor({ id, name, description, organisation, role, status }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.organisation = organisation;
    this.role = role;
    this.status = status;
  }
}

module.exports = Service;
