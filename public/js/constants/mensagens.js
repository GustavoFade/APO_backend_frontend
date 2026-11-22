export const Mensagens = Object.freeze({
  CAMPOS_OBRIGATORIOS: 'Nome e e-mail são obrigatórios.',
  CLIENTE_NAO_ENCONTRADO_LISTA: 'Cliente não encontrado. A lista será atualizada.',
  CLIENTE_EXCLUIDO: 'Cliente excluído com sucesso.',
  CLIENTE_ATUALIZADO: 'Cliente atualizado com sucesso.',
  CLIENTE_CADASTRADO: 'Cliente cadastrado com sucesso.',
  FALHA_COMUNICACAO:
    'Falha de comunicação com o servidor. Verifique se a API está em execução.',
  ERRO_INESPERADO: 'Ocorreu um erro inesperado.',
  ERRO_COMUNICACAO_API: 'Erro na comunicação com a API.',
  CONFIRMAR_EXCLUSAO: (nome) => `Deseja excluir o cliente "${nome}"?`,
  EDITANDO: (nome) => `Editando: ${nome}`,
});

export const ErroRede = Object.freeze({
  NOME_TYPE_ERROR: 'TypeError',
  MENSAGEM_FAILED_FETCH: 'Failed to fetch',
});