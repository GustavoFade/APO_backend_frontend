const HttpStatus = require('../../constants/httpStatus');

class HttpError extends Error {
  constructor(mensagem, statusCode = HttpStatus.INTERNAL_SERVER_ERROR) {
    super(mensagem);
    this.name = 'HttpError';
    this.statusCode = statusCode;
  }
}

module.exports = HttpError;