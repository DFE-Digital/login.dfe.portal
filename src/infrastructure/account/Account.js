class Account {
  constructor(claims) {
    this.claims = claims;
  }

  get id() {
    return this.claims.sub;
  }

  get email() {
    return this.claims.email;
  }

  get name() {
    let name = this.claims.name;
    if (!name) {
      name = `${this.claims.given_name} ${this.claims.family_name}`.trim();
    }
    return name;
  }

  static fromContext(user) {
    return null;
  }

  static async getById(id) {
    return Promise.resolve(null);
  }


  async validatePassword(password) {
    return Promise.resolve(true);
  }

  async setPassword(password) {
    return Promise.resolve(null);
  }
}

module.exports = Account;
