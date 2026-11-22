const ClienteNaoEncontradoError = require('../errors/domain/ClienteNaoEncontradoError');
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
      throw new ClienteNaoEncontradoError();
    }
    return cliente;
  }

  criar(dados) {
    validarCamposObrigatorios(dados);
    const cliente = montarCliente(dados);
    return this.clienteRepository.salvar(cliente);
  }

  atualizar(id, dados) {
    validarCamposObrigatorios(dados);
    const existente = this.clienteRepository.buscarPorId(id);
    if (!existente) {
      throw new ClienteNaoEncontradoError();
    }
    const cliente = montarCliente(dados, Number(id));
    return this.clienteRepository.atualizar(id, cliente);
  }

  excluir(id) {
    const removido = this.clienteRepository.remover(id);
    if (!removido) {
      throw new ClienteNaoEncontradoError();
    }
  }
}

module.exports = ClienteService;