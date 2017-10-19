const action = (req, res) => {
  res.render('changepassword/views/change', {
    csrfToken: req.csrfToken(),
      title: 'Change password',
    validationFailed: false,
    validationMessages: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    }
  });
};

module.exports = action;