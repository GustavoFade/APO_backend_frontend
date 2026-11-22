class DomainError extends Error {
  constructor(mensagem, codigo) {
    super(mensagem);
    this.name = 'DomainError';
    this.codigo = codigo;
  }
}

module.exports = DomainError;