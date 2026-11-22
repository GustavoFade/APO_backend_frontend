export const TipoMensagem = Object.freeze({
  INFO: 'info',
  SUCESSO: 'sucesso',
  ERRO: 'erro',
});

export const ClasseMensagens = Object.freeze({
  BASE: 'mensagens',
  prefixo: (tipo) => `mensagens mensagens--${tipo}`,
});