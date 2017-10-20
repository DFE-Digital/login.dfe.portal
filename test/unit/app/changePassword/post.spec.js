jest.mock('./../../../../src/infrastructure/config');
jest.mock('./../../../../src/infrastructure/account');

describe('when processing a users request to change password', () => {

  let validatePassword;
  let setPassword;
  let req;
  let render;
  let flash;
  let redirect;
  let res;
  let action;

  beforeEach(() => {
    const config = require('./../../../../src/infrastructure/config');
    config.mockImplementation(() => {
      return {};
    });

    validatePassword = jest.fn().mockReturnValue(true);

    setPassword = jest.fn();

    const Account = require('./../../../../src/infrastructure/account');
    Account.fromContext = jest.fn().mockImplementation(() => {
      return {
        validatePassword,
        setPassword,
      };
    });

    req = {
      csrfToken: () => {
        return 'token';
      },
      body: {
        oldPassword: 'password',
        newPassword: 'new-password',
        confirmPassword: 'new-password',
      },
    };

    render = jest.fn();
    flash = jest.fn();
    redirect = jest.fn();
    res = {
      render,
      flash,
      redirect,
    };

    action = require('./../../../../src/app/changePassword/post');
  });

  it('then it should return failed view if old password not entered', async () => {
    req.body.oldPassword = '';

    await action(req, res);

    expect(render.mock.calls.length).toBe(1);
    expect(render.mock.calls[0][0]).toBe('changePassword/views/change');
    expect(render.mock.calls[0][1]).toMatchObject({
      validationFailed: true,
      validationMessages: {
        oldPassword: 'Enter your current password',
      },
    });
  });

  it('then it should return failed view if new password not entered', async () => {
    req.body.newPassword = '';

    await action(req, res);

    expect(render.mock.calls.length).toBe(1);
    expect(render.mock.calls[0][0]).toBe('changePassword/views/change');
    expect(render.mock.calls[0][1]).toMatchObject({
      validationFailed: true,
      validationMessages: {
        newPassword: 'Enter a new password',
      },
    });
  });

  it('then it should return failed view if confirm password not entered', async () => {
    req.body.confirmPassword = '';

    await action(req, res);

    expect(render.mock.calls.length).toBe(1);
    expect(render.mock.calls[0][0]).toBe('changePassword/views/change');
    expect(render.mock.calls[0][1]).toMatchObject({
      validationFailed: true,
      validationMessages: {
        confirmPassword: 'Passwords do not match',
      },
    });
  });

  it('then it should return failed view if confirm password does not match new password', async () => {
    req.body.newPassword = 'password1';
    req.body.confirmPassword = 'password2';

    await action(req, res);

    expect(render.mock.calls.length).toBe(1);
    expect(render.mock.calls[0][0]).toBe('changePassword/views/change');
    expect(render.mock.calls[0][1]).toMatchObject({
      validationFailed: true,
      validationMessages: {
        confirmPassword: 'Passwords do not match',
      },
    });
  });

  it('then it should return failed view if old password is not valid', async () => {
    validatePassword.mockReturnValue(false);

    await action(req, res);

    expect(render.mock.calls.length).toBe(1);
    expect(render.mock.calls[0][0]).toBe('changePassword/views/change');
    expect(render.mock.calls[0][1]).toMatchObject({
      validationFailed: true,
      validationMessages: {
        oldPassword: 'We do not recognise the password you entered. Please check and try again.',
      },
    });
  });

  it('then it should set user password if validation passes', async () => {
    await action(req, res);

    expect(setPassword.mock.calls.length).toBe(1);
    expect(setPassword.mock.calls[0][0]).toBe('new-password');
  });

  it('then it should set flash message if validation passes', async () => {
    await action(req, res);

    expect(flash.mock.calls.length).toBe(1);
    expect(flash.mock.calls[0][0]).toBe('info');
    expect(flash.mock.calls[0][1]).toBe('Your password has been changed');
  });

  it('then it should redirect to profile if validation passes', async () => {
    await action(req, res);

    expect(redirect.mock.calls.length).toBe(1);
    expect(redirect.mock.calls[0][0]).toBe('/profile');
  });

});