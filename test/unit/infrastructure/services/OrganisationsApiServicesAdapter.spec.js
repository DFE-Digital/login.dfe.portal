const {mockRequest, mockResponse} = require('./../../../utils/jestMocks');
const Service = require('./../../../../src/infrastructure/services/Service');

jest.mock('request-promise');
jest.mock('login.dfe.jwt-strategies');
jest.mock('./../../../../src/infrastructure/config');

describe('when getting available services for a user', () => {
  let req;
  let res;
  let rp;

  let adapter;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();

    rp = require('request-promise');
    rp.mockReturnValue([
      {
        id: 'service1',
        name: 'Service One',
        description: 'Some service',
      },
    ]);

    const jwtStrategy = require('login.dfe.jwt-strategies');
    jwtStrategy.mockImplementation(() => {
      return {
        getBearerToken: () => 'token',
      };
    });

    const config = require('./../../../../src/infrastructure/config');
    config.mockImplementation(() => {
      return {
        organisations: {
          service: {
            url: 'http://orgs.api.test',
          },
        },
      };
    });

    adapter = require('./../../../../src/infrastructure/services/OrganisationsApiServicesAdapter');
  });

  it('then it should query organisations api', async () => {
    await adapter.getAvailableServicesForUser('user1');

    expect(rp.mock.calls.length).toBe(1);
    expect(rp.mock.calls[0][0].uri).toBe('http://orgs.api.test/services/unassociated-with-user/user1');
  });

  it('then it should include the bearer token for authorization', async () => {
    await adapter.getAvailableServicesForUser('user1');

    expect(rp.mock.calls[0][0].headers).not.toBeNull();
    expect(rp.mock.calls[0][0].headers.authorization).toBe('Bearer token');
  });

  it('then it should map api result to array of Services', async () => {
    const actual = await adapter.getAvailableServicesForUser('user1');

    expect(actual).not.toBeNull();
    expect(actual).toBeInstanceOf(Array);
    expect(actual.length).toBe(1);
    expect(actual[0]).toBeInstanceOf(Service);
    expect(actual[0].id).toBe('service1');
    expect(actual[0].name).toBe('Service One');
    expect(actual[0].description).toBe('Some service');
  })
});