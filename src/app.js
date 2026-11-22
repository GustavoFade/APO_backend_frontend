const express = require('express');
const criarClienteRoutes = require('./routes/clienteRoutes');
const errorHandler = require('./middlewares/errorHandler');
const notFound = require('./middlewares/notFound');

function criarApp(clienteController) {
  const app = express();

  app.use(express.json());
  app.use('/clientes', criarClienteRoutes(clienteController));
  app.use(notFound);
  app.use(errorHandler);

  return app;
}

module.exports = criarApp;