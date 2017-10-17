const action = (req, res) => {
  res.render('changepassword/views/change', {
    csrfToken: req.csrfToken(),
    validationFailed: false,
    validationMessages: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    }
  });
};

module.exports = action;