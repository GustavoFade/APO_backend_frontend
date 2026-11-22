const express = require('express');
const path = require('path');
const registerRoutes = require('./routes/registerRoutes');
const errorHandler = require('./middlewares/errorHandler');
const notFound = require('./middlewares/notFound');

function createApp(container) {
  const app = express();

  app.use(express.json());

  const publicDir = path.join(__dirname, '..', 'public');
  app.use(express.static(publicDir));

  registerRoutes(app, container);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}

module.exports = createApp;