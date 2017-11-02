const Account = require('./Account');
const rp = require('request-promise');
const jwtStrategy = require('login.dfe.jwt-strategies');
const config = require('./../config')();

const callDirectoriesApi = async (resource, body) => {
  const token = await jwtStrategy(config.directories.service).getBearerToken();
  try {
    const result = await rp({
      method: 'POST',
      uri: `${config.directories.service.url}/${resource}`,
      headers: {
        authorization: `bearer ${token}`,
      },
      body,
      json: true,
    });

    return {
      success: true,
      result,
    };
  } catch (e) {
    return {
      success: false,
      statusCode: e.statusCode,
      errorMessage: e.message,
    };
  }
};

class DirectoriesApiAccount extends Account {
  static fromContext(user) {
    return new DirectoriesApiAccount(user);
  }

  async validatePassword(password) {
    const username = this.claims.email;
    const response = await callDirectoriesApi(`${config.directories.directoryId}/user/authenticate`, {
      username,
      password,
    });
    return response.success;
  }

  async setPassword(password) {
    const uid = this.claims.sub;
    const response = await callDirectoriesApi(`${config.directories.directoryId}/user/${uid}/changepassword`, {
      password,
    });
    if (!response.success) {
      throw new Error(response.errorMessage);
    }
  }
}

module.exports = DirectoriesApiAccount;