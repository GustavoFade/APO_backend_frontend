const { normalizarTexto, campoPreenchido } = require('../domain/cliente');
const CamposObrigatoriosClienteError = require('../errors/domain/CamposObrigatoriosClienteError');

function validateClienteBody(req, res, next) {
  const nome = normalizarTexto(req.body?.nome);
  const email = normalizarTexto(req.body?.email);

  if (!campoPreenchido(nome) || !campoPreenchido(email)) {
    return next(new CamposObrigatoriosClienteError());
  }

  req.body = {
    ...req.body,
    nome,
    email,
    telefone: normalizarTexto(req.body?.telefone),
  };
  return next();
}

module.exports = validateClienteBody;