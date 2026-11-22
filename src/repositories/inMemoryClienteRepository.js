const ClienteRepository = require('./clienteRepository');
const {
  INDICE_NAO_ENCONTRADO,
  ID_INICIAL,
} = require('../constants/repository');

class InMemoryClienteRepository extends ClienteRepository {
  constructor() {
    super();
    this.clientes = [];
    this.proximoId = ID_INICIAL;
  }

  listar() {
    return this.clientes.map((cliente) => ({ ...cliente }));
  }

  buscarPorId(id) {
    return this.clientes.find((cliente) => cliente.id === Number(id)) || null;
  }

  salvar(cliente) {
    const novo = { ...cliente, id: this.proximoId++ };
    this.clientes.push(novo);
    return { ...novo };
  }

  atualizar(id, dados) {
    const indice = this.clientes.findIndex(
      (cliente) => cliente.id === Number(id),
    );
    if (indice === INDICE_NAO_ENCONTRADO) {
      return null;
    }
    this.clientes[indice] = { ...this.clientes[indice], ...dados, id: Number(id) };
    return { ...this.clientes[indice] };
  }

  remover(id) {
    const indice = this.clientes.findIndex(
      (cliente) => cliente.id === Number(id),
    );
    if (indice === INDICE_NAO_ENCONTRADO) {
      return false;
    }
    this.clientes.splice(indice, 1);
    return true;
  }
}

module.exports = InMemoryClienteRepository;