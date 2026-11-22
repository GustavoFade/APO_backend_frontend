/**
 * Contrato (porta) de persistência de clientes.
 * Implementações devem expor: listar, buscarPorId, salvar, atualizar, remover.
 */
class ClienteRepository {
  listar() {
    throw new Error('Método listar não implementado.');
  }

  buscarPorId() {
    throw new Error('Método buscarPorId não implementado.');
  }

  salvar() {
    throw new Error('Método salvar não implementado.');
  }

  atualizar() {
    throw new Error('Método atualizar não implementado.');
  }

  remover() {
    throw new Error('Método remover não implementado.');
  }
}

module.exports = ClienteRepository;