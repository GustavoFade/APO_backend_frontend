import { clienteDataSource } from './api.js';
import { criarFormulario } from './formulario.js';
import { criarListagemClientes } from './clientes.js';
import { HttpStatus } from './constants/httpStatus.js';
import { ErroRede, Mensagens } from './constants/mensagens.js';
import { ClasseMensagens, TipoMensagem } from './constants/ui.js';

const areaMensagens = document.getElementById('mensagens');
const areaLista = document.getElementById('area-lista');
const indicadorCarregamento = document.getElementById('lista-carregando');

function mensagemErroComunicacao(erro) {
  if (
    erro.name === ErroRede.NOME_TYPE_ERROR
    || erro.message === ErroRede.MENSAGEM_FAILED_FETCH
  ) {
    return Mensagens.FALHA_COMUNICACAO;
  }
  return erro.message || Mensagens.ERRO_INESPERADO;
}

function exibirMensagem(texto, tipo = TipoMensagem.INFO) {
  areaMensagens.textContent = texto;
  areaMensagens.className = ClasseMensagens.prefixo(tipo);
}

function limparMensagem() {
  areaMensagens.textContent = '';
  areaMensagens.className = ClasseMensagens.BASE;
}

function mensagemParaErroApi(erro) {
  if (erro.status === HttpStatus.NOT_FOUND) {
    return Mensagens.CLIENTE_NAO_ENCONTRADO_LISTA;
  }
  if (erro.status === HttpStatus.BAD_REQUEST) {
    return erro.message;
  }
  return mensagemErroComunicacao(erro);
}

async function carregarClientes(listagem) {
  try {
    indicadorCarregamento.hidden = false;
    const clientes = await clienteDataSource.listar();
    listagem.renderizar(clientes);
  } catch (erro) {
    exibirMensagem(mensagemErroComunicacao(erro), TipoMensagem.ERRO);
  } finally {
    indicadorCarregamento.hidden = true;
  }
}

const listagem = criarListagemClientes({
  areaLista,
  aoEditar(cliente) {
    limparMensagem();
    formulario.preencherParaEdicao(cliente);
    exibirMensagem(Mensagens.EDITANDO(cliente.nome), TipoMensagem.INFO);
  },
  async aoExcluir(cliente) {
    const confirmar = window.confirm(Mensagens.CONFIRMAR_EXCLUSAO(cliente.nome));
    if (!confirmar) {
      return;
    }

    try {
      await clienteDataSource.excluir(cliente.id);
      exibirMensagem(Mensagens.CLIENTE_EXCLUIDO, TipoMensagem.SUCESSO);
      await carregarClientes(listagem);
    } catch (erro) {
      exibirMensagem(mensagemParaErroApi(erro), TipoMensagem.ERRO);
      await carregarClientes(listagem);
    }
  },
});

const formulario = criarFormulario({
  aoCancelar: limparMensagem,
  async aoEnviar(evento) {
    if (evento.tipo === 'validacao') {
      exibirMensagem(evento.mensagem, TipoMensagem.ERRO);
      return;
    }

    formulario.definirCarregando(true);
    limparMensagem();

    try {
      if (evento.id) {
        await clienteDataSource.atualizar(evento.id, evento.dados);
        exibirMensagem(Mensagens.CLIENTE_ATUALIZADO, TipoMensagem.SUCESSO);
      } else {
        await clienteDataSource.criar(evento.dados);
        exibirMensagem(Mensagens.CLIENTE_CADASTRADO, TipoMensagem.SUCESSO);
      }
      formulario.limpar();
      await carregarClientes(listagem);
    } catch (erro) {
      exibirMensagem(mensagemParaErroApi(erro), TipoMensagem.ERRO);
      if (erro.status === HttpStatus.NOT_FOUND) {
        formulario.limpar();
        await carregarClientes(listagem);
      }
    } finally {
      formulario.definirCarregando(false);
    }
  },
});

carregarClientes(listagem);