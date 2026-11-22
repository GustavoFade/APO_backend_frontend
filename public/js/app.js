import { clienteDataSource } from './mockClienteStore.js';
import { criarFormulario } from './formulario.js';
import { criarListagemClientes } from './clientes.js';

const areaMensagens = document.getElementById('mensagens');
const areaLista = document.getElementById('area-lista');
const indicadorCarregamento = document.getElementById('lista-carregando');

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
    exibirMensagem(
      erro.message || 'Não foi possível carregar os clientes.',
      'erro',
    );
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
          : erro.message || 'Não foi possível excluir o cliente.';
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
          : erro.message || 'Não foi possível salvar o cliente.';
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