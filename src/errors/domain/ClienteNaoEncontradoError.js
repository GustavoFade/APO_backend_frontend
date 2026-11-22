const DomainError = require('./DomainError');
const Mensagens = require('../../constants/mensagens');

const CODIGO_CLIENTE_NAO_ENCONTRADO = 'CLIENTE_NAO_ENCONTRADO';

class ClienteNaoEncontradoError extends DomainError {
  constructor() {
    super(Mensagens.CLIENTE_NAO_ENCONTRADO, CODIGO_CLIENTE_NAO_ENCONTRADO);
    this.name = 'ClienteNaoEncontradoError';
  }
}

module.exports = ClienteNaoEncontradoError;