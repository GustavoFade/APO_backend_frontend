const AppError = require('../errors/AppError');
const { normalizarTexto } = require('../domain/cliente');

function validateClienteBody(req, res, next) {
  const nome = normalizarTexto(req.body?.nome);
  const email = normalizarTexto(req.body?.email);

  if (!nome || !email) {
    return next(
      new AppError('Nome e e-mail são obrigatórios.', 400),
    );
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