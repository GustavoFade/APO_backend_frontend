const { TAMANHO_CAMPO_MINIMO } = require('../constants/domain');
const CamposObrigatoriosClienteError = require('../errors/domain/CamposObrigatoriosClienteError');

function normalizarTexto(valor) {
  return String(valor ?? '').trim();
}

function campoPreenchido(valor) {
  return normalizarTexto(valor).length > TAMANHO_CAMPO_MINIMO;
}

function validarCamposObrigatorios({ nome, email }) {
  const nomeOk = campoPreenchido(nome);
  const emailOk = campoPreenchido(email);
  if (!nomeOk || !emailOk) {
    throw new CamposObrigatoriosClienteError();
  }
}

function montarCliente(dados, id) {
  return {
    id,
    nome: normalizarTexto(dados.nome),
    email: normalizarTexto(dados.email),
    telefone: normalizarTexto(dados.telefone),
  };
}

module.exports = {
  validarCamposObrigatorios,
  montarCliente,
  normalizarTexto,
  campoPreenchido,
};