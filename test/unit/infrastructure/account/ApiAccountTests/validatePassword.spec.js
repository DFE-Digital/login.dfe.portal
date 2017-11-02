jest.mock('request-promise');
jest.mock('login.dfe.jwt-strategies');
jest.mock('./../../../../../src/infrastructure/config');

describe('When validating a users password', () => {

  const user = {email: 'user.one@unit.test'};
  const password = 'password';

  let account;
  let getBearerToken;
  let rp;

  beforeEach(() => {
    const config = require('./../../../../../src/infrastructure/config');
    config.mockImplementation(() => {
      return {
        directories: {
          directoryId: 'directory1',
          service: {
            url: 'http://unit.test.local',
          }
        }
      };
    });

    getBearerToken = jest.fn().mockReturnValue('token');
    const jwtStrategy = require('login.dfe.jwt-strategies');
    jwtStrategy.mockImplementation(() => {
      return {
        getBearerToken: getBearerToken
      };
    });

    rp = jest.fn();
    const requestPromise = require('request-promise');
    requestPromise.mockImplementation(rp);

    const Account = require('./../../../../../src/infrastructure/account/DirectoriesApiAccount');
    account = Account.fromContext(user);
  });

  it('then it should authenticate user against directories api', async () => {
    await account.validatePassword(password);

    expect(rp.mock.calls.length).toBe(1);
    expect(rp.mock.calls[0][0].method).toBe('POST');
    expect(rp.mock.calls[0][0].uri).toBe('http://unit.test.local/directory1/user/authenticate');
    expect(rp.mock.calls[0][0].body).toMatchObject({
      username: user.email,
      password: password,
    });
  });

  it('then it should authorize api using jwt strategy', async () => {
    await account.validatePassword(password);

    expect(getBearerToken.mock.calls.length).toBe(1);
    expect(rp.mock.calls[0][0].headers.authorization).toBe('bearer token');
  });

  it('then it should return true is password is valid', async () => {
    const result = await account.validatePassword(password);

    expect(result).toBe(true);
  });

  it('then it should return false when api returns error', async () => {
    rp.mockImplementation(() => {
      const error = new Error('Unit test');
      error.statusCode = 401;
      throw error;
    });

    const result = await account.validatePassword(password);

    expect(result).toBe(false);
  });

});