const AppError = require('../errors/AppError');

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const mensagem =
    err instanceof AppError
      ? err.message
      : 'Erro interno do servidor.';

  if (statusCode >= 500) {
    console.error(err);
  }

  res.status(statusCode).json({ erro: mensagem });
}

module.exports = errorHandler;