const {getUserEmail} = require('./../../infrastructure/utils');
const Account = require('./../../infrastructure/account');

const validate = (oldPassword, newPassword, confirmPassword) => {
  const messages = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };
  let failed = false;

  if (!oldPassword) {
    messages.oldPassword = 'Must enter current password';
    failed = true;
  }

  if (!newPassword) {
    messages.newPassword = 'Must enter your new password';
    failed = true;
  }
  else if (!confirmPassword) {
    messages.confirmPassword = 'Must enter confirm new password';
    failed = true;
  }

  if (newPassword && confirmPassword && newPassword !== confirmPassword) {
    messages.confirmPassword = 'Passwords do not match';
    failed = true;
  }

  return {
    failed,
    messages,
  };
};

const action = async (req, res) => {
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  const confirmPassword = req.body.confirmPassword;

  const validationResult = validate(oldPassword, newPassword, confirmPassword);
  if (validationResult.failed) {
    res.render('changepassword/views/change', {
      csrfToken: req.csrfToken(),
      validationFailed: true,
      validationMessages: validationResult.messages,
    });
    return;
  }

  const account = Account.fromContext(req.user);
  const oldPasswordIsCorrect = await account.validatePassword(oldPassword);
  if (!oldPasswordIsCorrect) {
    res.render('changepassword/views/change', {
      csrfToken: req.csrfToken(),
      validationFailed: true,
      validationMessages: {
        oldPassword: 'Incorrect password',
        newPassword: '',
        confirmPassword: '',
      },
    });
    return;
  }

  await account.setPassword(newPassword);

  res.flash('info', 'Your password has been changed');
  res.redirect('/profile');
};

module.exports = action;