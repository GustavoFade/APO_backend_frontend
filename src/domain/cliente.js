const {
  TAMANHO_CAMPO_MINIMO,
  TAMANHO_EMAIL_MAXIMO,
  TAMANHO_TELEFONE_MAXIMO,
  REGEX_EMAIL,
} = require('../constants/domain');
const Mensagens = require('../constants/mensagens');
const CamposObrigatoriosClienteError = require('../errors/domain/CamposObrigatoriosClienteError');
const ValidacaoClienteError = require('../errors/domain/ValidacaoClienteError');

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

function validarFormatoEmail(email) {
  const valor = normalizarTexto(email);
  if (valor.length > TAMANHO_EMAIL_MAXIMO) {
    throw new ValidacaoClienteError(Mensagens.EMAIL_TAMANHO_MAXIMO);
  }
  if (!REGEX_EMAIL.test(valor)) {
    throw new ValidacaoClienteError(Mensagens.EMAIL_INVALIDO);
  }
}

function validarTamanhoTelefone(telefone) {
  const valor = normalizarTexto(telefone);
  if (valor && valor.length > TAMANHO_TELEFONE_MAXIMO) {
    throw new ValidacaoClienteError(Mensagens.TELEFONE_TAMANHO_MAXIMO);
  }
}

function validarCliente(dados) {
  validarCamposObrigatorios(dados);
  validarFormatoEmail(dados.email);
  validarTamanhoTelefone(dados.telefone);
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
  validarCliente,
  validarCamposObrigatorios,
  montarCliente,
  normalizarTexto,
  campoPreenchido,
};