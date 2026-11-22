const express = require('express');
const path = require('path');
const criarClienteRoutes = require('./routes/clienteRoutes');
const errorHandler = require('./middlewares/errorHandler');
const notFound = require('./middlewares/notFound');

function criarApp(clienteController) {
  const app = express();

  app.use(express.json());

  const publicDir = path.join(__dirname, '..', 'public');
  app.use(express.static(publicDir));

  app.use('/clientes', criarClienteRoutes(clienteController));
  app.use(notFound);
  app.use(errorHandler);

  return app;
}

module.exports = criarApp;