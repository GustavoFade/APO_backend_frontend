const DomainError = require('./DomainError');
const Mensagens = require('../../constants/mensagens');

const CODIGO_CAMPOS_OBRIGATORIOS = 'CAMPOS_OBRIGATORIOS_CLIENTE';

class CamposObrigatoriosClienteError extends DomainError {
  constructor() {
    super(Mensagens.CAMPOS_OBRIGATORIOS, CODIGO_CAMPOS_OBRIGATORIOS);
    this.name = 'CamposObrigatoriosClienteError';
  }
}

module.exports = CamposObrigatoriosClienteError;