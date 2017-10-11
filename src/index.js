const path = require('path');
const fs = require('fs');
const express = require('express');
const passport = require('passport');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const session = require('express-session');
const morgan = require('morgan');
const csurf = require('csurf');
const config = require('./infrastructure/config');
const getPassportStrategy = require('./infrastructure/oidc');
const logger = require('./infrastructure/logger');
const devRoutes = require('./app/devLauncher');
const portalHome = require('./app/home');
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
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(expressLayouts);

  // ejs settings
  app.set('view engine', 'ejs');
  app.set('views', path.resolve(__dirname, 'app'));
  app.set('layout', 'layouts/layout');

  // Setup routes
  if(config.hostingEnvironment.showDevViews === 'true') app.use('/dev',devRoutes(csrf));
  app.use('/', portalHome(csrf));

  // auth callbacks
  app.get('/auth', passport.authenticate('oidc'));
  app.get('/auth/cb', passport.authenticate('oidc', { successRedirect: '/', failureRedirect: '/auth' }));

  // Start an http or https server
  startServer(app, config, logger);
};

init().catch((err => {
  logger.error(err);
}));