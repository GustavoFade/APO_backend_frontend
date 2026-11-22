const DomainConstantes = Object.freeze({
  TAMANHO_CAMPO_MINIMO: 0,
  TAMANHO_EMAIL_MAXIMO: 254,
  TAMANHO_TELEFONE_MAXIMO: 15,
  REGEX_EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
});

module.exports = DomainConstantes;