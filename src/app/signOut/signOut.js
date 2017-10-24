'use strict';

const url = require('url');
const passport = require('passport');

const signUserOut = (req, res, next) => {
  if (req.user.id_token){
    let id_token = req.user.id_token;
    let issuer = passport._strategies['oidc']._issuer;
    const return_url = `${req.protocol}://${req.get('host')}/signout/complete`;
    req.logout();
    res.redirect(url.format(Object.assign(url.parse(issuer.end_session_endpoint), {
      search: null,
      query: {
        id_token_hint: id_token,
        post_logout_redirect_uri: return_url
      }
    })))
  } else{
    res.redirect('/');
  }


};

module.exports = signUserOut;


