const Account = require('./Account');

const accounts = [
  {
    sub: '',
    name: '',
    email: '',
  },
];

class StaticAccount extends Account {
  static fromContext(user) {
    return new StaticAccount(user);
  }
  static async getById(id) {
    const account = accounts.find(item => item.sub.toLowerCase() === id.toLowerCase());
    return Promise.resolve(account);
  }
}

module.exports = StaticAccount;