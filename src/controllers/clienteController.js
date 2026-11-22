const HttpStatus = require('../constants/httpStatus');

class ClienteController {
  constructor(clienteService) {
    this.clienteService = clienteService;
  }

  listar = (req, res, next) => {
    try {
      const clientes = this.clienteService.listarTodos();
      res.status(HttpStatus.OK).json(clientes);
    } catch (erro) {
      next(erro);
    }
  };

  buscarPorId = (req, res, next) => {
    try {
      const cliente = this.clienteService.buscarPorId(req.params.id);
      res.status(HttpStatus.OK).json(cliente);
    } catch (erro) {
      next(erro);
    }
  };

  criar = (req, res, next) => {
    try {
      const cliente = this.clienteService.criar(req.body);
      res.status(HttpStatus.CREATED).json(cliente);
    } catch (erro) {
      next(erro);
    }
  };

  atualizar = (req, res, next) => {
    try {
      const cliente = this.clienteService.atualizar(req.params.id, req.body);
      res.status(HttpStatus.OK).json(cliente);
    } catch (erro) {
      next(erro);
    }
  };

  excluir = (req, res, next) => {
    try {
      this.clienteService.excluir(req.params.id);
      res.status(HttpStatus.NO_CONTENT).send();
    } catch (erro) {
      next(erro);
    }
  };
}

module.exports = ClienteController;