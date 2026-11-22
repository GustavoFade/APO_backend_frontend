const {
  normalizarTexto,
  validarCliente,
} = require('../domain/cliente');

function validateClienteBody(req, res, next) {
  const corpo = {
    nome: normalizarTexto(req.body?.nome),
    email: normalizarTexto(req.body?.email),
    telefone: normalizarTexto(req.body?.telefone),
  };

  try {
    validarCliente(corpo);
  } catch (erro) {
    return next(erro);
  }

  req.body = corpo;
  return next();
}

module.exports = validateClienteBody;