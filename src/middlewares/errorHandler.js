const HttpStatus = require('../constants/httpStatus');
const resolverRespostaHttp = require('../http/resolverRespostaHttp');

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  const { statusCode, mensagem } = resolverRespostaHttp(err);

  if (statusCode >= HttpStatus.INTERNAL_SERVER_ERROR) {
    console.error(err);
  }

  res.status(statusCode).json({ erro: mensagem });
}

module.exports = errorHandler;