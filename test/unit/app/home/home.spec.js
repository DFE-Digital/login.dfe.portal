const Service = require('./../../../../src/infrastructure/services/Service');
const {mockRequest, mockResponse} = require('./../../../utils/jestMocks');

jest.mock('./../../../../src/infrastructure/utils');

describe('when displaying the home page', () => {
  const availableServices = [
    new Service({id: '0a0410ba-f896-4c2b-aa08-6337a0d3db2e', title: 'Academisation and free schools self service', description: 'Bacon ipsum dolor amet ipsum irure ball tip pariatur hamburger, adipisicing dolor frankfurter bacon bresaola capicola drumstick. Corned beef fugiat andouille irure porchetta. Meatball veniam hamburger ham hock bacon cillum t-bone adipisicing eiusmod tenderloin burgdoggen officia. Chuck boudin excepteur proident. Biltong andouille drumstick, aliquip ground round ribeye exercitation ut consectetur esse consequat. Ribeye elit ground round ea cupidatat ad.'}),
    new Service({id: '0a0410ba-f896-4c2b-aa08-6337a0d3db2e', title: 'Analyse School Performance', description: 'Enables controlled school users to download their own pupil performance data allowing for the monitoring of progress at pupil level. The site also hosts the Ofsted Inspection Dashboard.' }),
  ];

  let req;
  let res;
  let utilsGetUserDisplayName;
  let servicesGetAvailableServicesForUser;

  let home;

  beforeEach(() => {
    req = mockRequest();
    req.user = {
      sub: 'user1',
      email: 'user.one@unit.test',
    };
    res = mockResponse();

    utilsGetUserDisplayName = jest.fn().mockImplementation((user) => {
      if(user == req.user) {
        return 'User One';
      }
      return '';
    });
    const utils = require('./../../../../src/infrastructure/utils');
    utils.getUserDisplayName = utilsGetUserDisplayName;

    servicesGetAvailableServicesForUser = jest.fn().mockReturnValue(availableServices);
    const services = require('./../../../../src/infrastructure/services');
    services.getAvailableServicesForUser = servicesGetAvailableServicesForUser;

    home = require('./../../../../src/app/home/home');
  });

  it('then it should return the home view', async () => {
    await home(req, res);

    expect(res.render.mock.calls.length).toBe(1);
    expect(res.render.mock.calls[0][0]).toBe('home/views/home');
  });

  it('then it should include the users display name', async () => {
    await home(req, res);

    expect(res.render.mock.calls[0][1].displayName).toBe('User One');
  });

  it('then it should include the full user', async () => {
    await home(req, res);

    expect(res.render.mock.calls[0][1].user).toBe(req.user);
  });

  it('then it should include the available servicies for the user', async () => {
    await home(req, res);

    expect(res.render.mock.calls[0][1].availableServices).toBe(availableServices);
  });
});
