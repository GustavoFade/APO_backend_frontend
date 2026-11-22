const express = require('express');
const validateClienteBody = require('../middlewares/validateClienteBody');

function criarClienteRoutes(clienteController) {
  const router = express.Router();

  router.get('/', clienteController.listar);
  router.get('/:id', clienteController.buscarPorId);
  router.post('/', validateClienteBody, clienteController.criar);
  router.put('/:id', validateClienteBody, clienteController.atualizar);
  router.delete('/:id', clienteController.excluir);

  return router;
}

module.exports = criarClienteRoutes;