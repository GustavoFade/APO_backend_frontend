import { HttpStatus } from './constants/httpStatus.js';
import { Mensagens } from './constants/mensagens.js';

const BASE_URL = '';

async function lerCorpo(response) {
  const texto = await response.text();
  if (!texto) {
    return null;
  }
  try {
    return JSON.parse(texto);
  } catch {
    return null;
  }
}

function criarErro(mensagem, status) {
  const erro = new Error(mensagem);
  erro.status = status;
  return erro;
}

async function tratarResposta(response) {
  const dados = await lerCorpo(response);

  if (!response.ok) {
    const mensagem = dados?.erro || Mensagens.ERRO_COMUNICACAO_API;
    throw criarErro(mensagem, response.status);
  }

  if (response.status === HttpStatus.NO_CONTENT) {
    return null;
  }

  return dados;
}

export const clienteDataSource = {
  async listar() {
    const response = await fetch(`${BASE_URL}/clientes`);
    return tratarResposta(response);
  },

  async buscar(id) {
    const response = await fetch(`${BASE_URL}/clientes/${id}`);
    return tratarResposta(response);
  },

  async criar(dados) {
    const response = await fetch(`${BASE_URL}/clientes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    });
    return tratarResposta(response);
  },

  async atualizar(id, dados) {
    const response = await fetch(`${BASE_URL}/clientes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    });
    return tratarResposta(response);
  },

  async excluir(id) {
    const response = await fetch(`${BASE_URL}/clientes/${id}`, {
      method: 'DELETE',
    });
    return tratarResposta(response);
  },
};