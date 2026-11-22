import { clienteDataSource } from './api.js';
import { criarFormulario } from './formulario.js';
import { criarListagemClientes } from './clientes.js';

const areaMensagens = document.getElementById('mensagens');
const areaLista = document.getElementById('area-lista');
const indicadorCarregamento = document.getElementById('lista-carregando');

function mensagemErroComunicacao(erro) {
  if (erro.name === 'TypeError' || erro.message === 'Failed to fetch') {
    return 'Falha de comunicação com o servidor. Verifique se a API está em execução.';
  }
  return erro.message || 'Ocorreu um erro inesperado.';
}

function exibirMensagem(texto, tipo = 'info') {
  areaMensagens.textContent = texto;
  areaMensagens.className = `mensagens mensagens--${tipo}`;
}

function limparMensagem() {
  areaMensagens.textContent = '';
  areaMensagens.className = 'mensagens';
}

async function carregarClientes(listagem) {
  try {
    indicadorCarregamento.hidden = false;
    const clientes = await clienteDataSource.listar();
    listagem.renderizar(clientes);
  } catch (erro) {
    exibirMensagem(mensagemErroComunicacao(erro), 'erro');
  } finally {
    indicadorCarregamento.hidden = true;
  }
}

const listagem = criarListagemClientes({
  areaLista,
  aoEditar(cliente) {
    limparMensagem();
    formulario.preencherParaEdicao(cliente);
    exibirMensagem(`Editando: ${cliente.nome}`, 'info');
  },
  async aoExcluir(cliente) {
    const confirmar = window.confirm(
      `Deseja excluir o cliente "${cliente.nome}"?`,
    );
    if (!confirmar) {
      return;
    }

    try {
      await clienteDataSource.excluir(cliente.id);
      exibirMensagem('Cliente excluído com sucesso.', 'sucesso');
      await carregarClientes(listagem);
    } catch (erro) {
      const texto =
        erro.status === 404
          ? 'Cliente não encontrado. A lista será atualizada.'
          : mensagemErroComunicacao(erro);
      exibirMensagem(texto, 'erro');
      await carregarClientes(listagem);
    }
  },
});

const formulario = criarFormulario({
  aoCancelar: limparMensagem,
  async aoEnviar(evento) {
    if (evento.tipo === 'validacao') {
      exibirMensagem(evento.mensagem, 'erro');
      return;
    }

    formulario.definirCarregando(true);
    limparMensagem();

    try {
      if (evento.id) {
        await clienteDataSource.atualizar(evento.id, evento.dados);
        exibirMensagem('Cliente atualizado com sucesso.', 'sucesso');
      } else {
        await clienteDataSource.criar(evento.dados);
        exibirMensagem('Cliente cadastrado com sucesso.', 'sucesso');
      }
      formulario.limpar();
      await carregarClientes(listagem);
    } catch (erro) {
      const texto =
        erro.status === 404
          ? 'Cliente não encontrado. A lista será atualizada.'
          : erro.status === 400
            ? erro.message
            : mensagemErroComunicacao(erro);
      exibirMensagem(texto, 'erro');
      if (erro.status === 404) {
        formulario.limpar();
        await carregarClientes(listagem);
      }
    } finally {
      formulario.definirCarregando(false);
    }
  },
});

carregarClientes(listagem);