const HttpStatus = require('../constants/httpStatus');
const Mensagens = require('../constants/mensagens');

function notFound(req, res) {
  res.status(HttpStatus.NOT_FOUND).json({ erro: Mensagens.ROTA_NAO_ENCONTRADA });
}

module.exports = notFound;