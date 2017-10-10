const path = require('path');
const fs = require('fs');
const express = require('express');
const passport = require('passport');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const session = require('express-session');
const morgan = require('morgan');
const csurf = require('csurf');
const config = require('./config');
const getPassportStrategy = require('./oidc');
const logger = require('./logger');
const devRoutes = require('./app/devLauncher');

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
  app.set('views', path.resolve(__dirname, 'views'));
  app.set('layout', 'layouts/layout');

  // Setup routes
  app.use(devRoutes(csrf));

  // auth callbacks
  app.get('/auth', passport.authenticate('oidc'));
  app.get('/auth/cb', passport.authenticate('oidc', { successRedirect: '/', failureRedirect: '/auth' }));

  // Setup server
  if (config.hostingEnvironment.env === 'dev') {
    app.proxy = true;

    const https = require('https');
    const options = {
      key: config.hostingEnvironment.sslKey,
      cert: config.hostingEnvironment.sslCert,
      requestCert: false,
      rejectUnauthorized: false
    };
    const server = https.createServer(options, app);

    server.listen(config.hostingEnvironment.port, function () {
      logger.info(`Dev server listening on https://${config.hostingEnvironment.host}:${config.hostingEnvironment.port}`);
    })
  } else {
    app.listen(process.env.PORT, function() {
      logger.info(`Dev server listening on http://${config.hostingEnvironment.host}:${process.env.PORT}`);
    });
  }
};

init().catch((err => {
  logger.error(err);
}));