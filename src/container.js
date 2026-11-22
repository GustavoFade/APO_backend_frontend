const InMemoryClienteRepository = require('./repositories/inMemoryClienteRepository');
const ClienteService = require('./services/clienteService');
const ClienteController = require('./controllers/clienteController');

function criarContainer() {
  const clienteRepository = new InMemoryClienteRepository();
  const clienteService = new ClienteService(clienteRepository);
  const clienteController = new ClienteController(clienteService);

  return {
    controllers: {
      cliente: clienteController,
    },
    clienteRepository,
    clienteService,
    clienteController,
  };
}

module.exports = { criarContainer };