const AppError = require('../errors/AppError');
const {
  montarCliente,
  validarCamposObrigatorios,
} = require('../domain/cliente');

class ClienteService {
  constructor(clienteRepository) {
    this.clienteRepository = clienteRepository;
  }

  listarTodos() {
    return this.clienteRepository.listar();
  }

  buscarPorId(id) {
    const cliente = this.clienteRepository.buscarPorId(id);
    if (!cliente) {
      throw new AppError('Cliente não encontrado.', 404);
    }
    return cliente;
  }

  criar(dados) {
    const mensagem = validarCamposObrigatorios(dados);
    if (mensagem) {
      throw new AppError(mensagem, 400);
    }
    const cliente = montarCliente(dados);
    return this.clienteRepository.salvar(cliente);
  }

  atualizar(id, dados) {
    const mensagem = validarCamposObrigatorios(dados);
    if (mensagem) {
      throw new AppError(mensagem, 400);
    }
    const existente = this.clienteRepository.buscarPorId(id);
    if (!existente) {
      throw new AppError('Cliente não encontrado.', 404);
    }
    const cliente = montarCliente(dados, Number(id));
    return this.clienteRepository.atualizar(id, cliente);
  }

  excluir(id) {
    const removido = this.clienteRepository.remover(id);
    if (!removido) {
      throw new AppError('Cliente não encontrado.', 404);
    }
  }
}

module.exports = ClienteService;