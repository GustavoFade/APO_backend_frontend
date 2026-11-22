function normalizarTexto(valor) {
  return String(valor ?? '').trim();
}

function validarCamposObrigatorios({ nome, email }) {
  const nomeOk = normalizarTexto(nome).length > 0;
  const emailOk = normalizarTexto(email).length > 0;
  if (!nomeOk || !emailOk) {
    return 'Nome e e-mail são obrigatórios.';
  }
  return null;
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
};