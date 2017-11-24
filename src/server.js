'use strict';


const startServer = (app, config, logger) => {
// Setup server
  if (config.hostingEnvironment.env === 'dev') {
    app.proxy = true;

    const https = require('https');
    const options = {
      key: config.hostingEnvironment.sslKey,
      cert: config.hostingEnvironment.sslCert,
      requestCert: false,
      rejectUnauthorized: false,
    };
    const server = https.createServer(options, app);

    server.listen(config.hostingEnvironment.port, () => {
      logger.info(`Dev server listening on https://${config.hostingEnvironment.host}:${config.hostingEnvironment.port}`);
    });
  } else {
    app.listen(process.env.PORT, () => {
      logger.info(`Dev server listening on http://${config.hostingEnvironment.host}:${process.env.PORT}`);
    });
  }
};

module.exports = startServer;
