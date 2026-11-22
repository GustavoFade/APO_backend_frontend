const HttpStatus = require('../constants/httpStatus');
const Mensagens = require('../constants/mensagens');
const HttpError = require('../errors/http/HttpError');
const ClienteNaoEncontradoError = require('../errors/domain/ClienteNaoEncontradoError');
const CamposObrigatoriosClienteError = require('../errors/domain/CamposObrigatoriosClienteError');
const ValidacaoClienteError = require('../errors/domain/ValidacaoClienteError');

function resolverRespostaHttp(erro) {
  if (erro instanceof HttpError) {
    return { statusCode: erro.statusCode, mensagem: erro.message };
  }

  if (erro instanceof ClienteNaoEncontradoError) {
    return {
      statusCode: HttpStatus.NOT_FOUND,
      mensagem: erro.message,
    };
  }

  if (
    erro instanceof CamposObrigatoriosClienteError
    || erro instanceof ValidacaoClienteError
  ) {
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      mensagem: erro.message,
    };
  }

  return {
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    mensagem: Mensagens.ERRO_INTERNO,
  };
}

module.exports = resolverRespostaHttp;