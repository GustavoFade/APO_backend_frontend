const DomainError = require('./DomainError');

const CODIGO_VALIDACAO_CLIENTE = 'VALIDACAO_CLIENTE';

class ValidacaoClienteError extends DomainError {
  constructor(mensagem) {
    super(mensagem, CODIGO_VALIDACAO_CLIENTE);
    this.name = 'ValidacaoClienteError';
  }
}

module.exports = ValidacaoClienteError;