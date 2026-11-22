const ApiRoutes = require('../constants/routes');
const criarClienteRoutes = require('./clienteRoutes');

function registerRoutes(app, container) {
  app.use(ApiRoutes.CLIENTES, criarClienteRoutes(container.controllers.cliente));
}

module.exports = registerRoutes;