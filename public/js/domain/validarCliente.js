import {
  REGEX_EMAIL,
  TAMANHO_CAMPO_MINIMO,
  TAMANHO_EMAIL_MAXIMO,
  TAMANHO_TELEFONE_MAXIMO,
} from '../constants/domain.js';
import { Mensagens } from '../constants/mensagens.js';

function normalizar(valor) {
  return String(valor ?? '').trim();
}

export function validarDadosCliente({ nome, email, telefone }) {
  const nomeNorm = normalizar(nome);
  const emailNorm = normalizar(email);
  const telefoneNorm = normalizar(telefone);

  if (
    nomeNorm.length <= TAMANHO_CAMPO_MINIMO
    || emailNorm.length <= TAMANHO_CAMPO_MINIMO
  ) {
    return Mensagens.CAMPOS_OBRIGATORIOS;
  }

  if (emailNorm.length > TAMANHO_EMAIL_MAXIMO) {
    return Mensagens.EMAIL_TAMANHO_MAXIMO;
  }

  if (!REGEX_EMAIL.test(emailNorm)) {
    return Mensagens.EMAIL_INVALIDO;
  }

  if (telefoneNorm.length > TAMANHO_TELEFONE_MAXIMO) {
    return Mensagens.TELEFONE_TAMANHO_MAXIMO;
  }

  return null;
}