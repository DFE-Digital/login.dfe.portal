const path = require('path');
const fs = require('fs');
const express = require('express');
const passport = require('passport');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const morgan = require('morgan');
const csurf = require('csurf');
const flash = require('express-flash-2');
const config = require('./infrastructure/config')();
const getPassportStrategy = require('./infrastructure/oidc');
const logger = require('./infrastructure/logger');
const setupAppRoutes = require('./app/routes');
const startServer = require('./server');

init = async () => {
  // setup passport middleware
  passport.use('oidc', await getPassportStrategy());
  passport.serializeUser(function (user, done) {
    done(null, user);
  });
  passport.deserializeUser(function (user, done) {
    done(null, user);
  });
  const csrf = csurf({ cookie: true });
  const app = express();
  // setup access logging (Morgan)
  app.use(morgan('combined', {stream: fs.createWriteStream('./access.log', {flags: 'a'})}));
  app.use(morgan('dev'));

  // Setup session params
  app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: config.hostingEnvironment.sessionSecret
  }));

  // use middleware
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(expressLayouts);
  app.use(flash());

  // ejs settings
  app.set('view engine', 'ejs');
  app.set('views', path.resolve(__dirname, 'app'));
  app.set('layout', 'layouts/layout');

  // Setup routes
  setupAppRoutes(app, csrf);


  // Setup global locals for layouts and views
  Object.assign(app.locals, {
    app: {
      title: 'Login.Dfe',
    },
  });



  // auth callbacks
  app.get('/auth', passport.authenticate('oidc'));
  app.get('/auth/cb', (req, res, next) => {
    passport.authenticate('oidc', (err, user, info) => {
      let redirectUrl = '/';

      if (err) { return next(err); }
      if (!user) { return res.redirect('/'); }

      if (req.session.redirectUrl) {
        redirectUrl = req.session.redirectUrl;
        req.session.redirectUrl = null;
      }

      req.logIn(user, (err) => {
        if (err) { return next(err); }
        if (redirectUrl.endsWith('signout/complete')) redirectUrl = '/';
        res.redirect(redirectUrl);
      });
    })(req, res, next)
  });

  // Start an http or https server
  startServer(app, config, logger);

  return app;
};

const app = init().catch((err => {
  logger.error(err);
}));

module.exports = app;

