function formatarTelefone(telefone) {
  const valor = (telefone || '').trim();
  return valor || '—';
}

function criarCartao(cliente, callbacks) {
  const artigo = document.createElement('article');
  artigo.className = 'cartao-cliente';
  artigo.dataset.id = cliente.id;

  const nome = document.createElement('h3');
  nome.className = 'cartao-cliente__nome';
  nome.textContent = cliente.nome;

  const email = document.createElement('p');
  email.className = 'cartao-cliente__meta';
  email.textContent = cliente.email;

  const telefone = document.createElement('p');
  telefone.className = 'cartao-cliente__meta';
  telefone.textContent = `Telefone: ${formatarTelefone(cliente.telefone)}`;

  const acoes = document.createElement('div');
  acoes.className = 'cartao-cliente__acoes';

  const btnEditar = document.createElement('button');
  btnEditar.type = 'button';
  btnEditar.className = 'botao botao--acao';
  btnEditar.textContent = 'Editar';
  btnEditar.addEventListener('click', () => callbacks.onEditar(cliente));

  const btnExcluir = document.createElement('button');
  btnExcluir.type = 'button';
  btnExcluir.className = 'botao botao--perigo';
  btnExcluir.textContent = 'Excluir';
  btnExcluir.addEventListener('click', () => callbacks.onExcluir(cliente));

  acoes.append(btnEditar, btnExcluir);
  artigo.append(nome, email, telefone, acoes);
  return artigo;
}

function criarTabela(clientes, callbacks) {
  const tabela = document.createElement('table');
  tabela.className = 'tabela-clientes';
  tabela.innerHTML = `
    <thead>
      <tr>
        <th scope="col">Nome</th>
        <th scope="col">E-mail</th>
        <th scope="col">Telefone</th>
        <th scope="col">Ações</th>
      </tr>
    </thead>
    <tbody></tbody>
  `;

  const corpo = tabela.querySelector('tbody');

  clientes.forEach((cliente) => {
    const linha = document.createElement('tr');
    linha.dataset.id = cliente.id;

    const celNome = document.createElement('td');
    celNome.textContent = cliente.nome;

    const celEmail = document.createElement('td');
    celEmail.textContent = cliente.email;

    const celTelefone = document.createElement('td');
    celTelefone.textContent = formatarTelefone(cliente.telefone);

    const celAcoes = document.createElement('td');
    celAcoes.className = 'acoes-celula';

    const btnEditar = document.createElement('button');
    btnEditar.type = 'button';
    btnEditar.className = 'botao botao--acao';
    btnEditar.textContent = 'Editar';
    btnEditar.addEventListener('click', () => callbacks.onEditar(cliente));

    const btnExcluir = document.createElement('button');
    btnExcluir.type = 'button';
    btnExcluir.className = 'botao botao--perigo';
    btnExcluir.textContent = 'Excluir';
    btnExcluir.addEventListener('click', () => callbacks.onExcluir(cliente));

    celAcoes.append(btnEditar, btnExcluir);
    linha.append(celNome, celEmail, celTelefone, celAcoes);
    corpo.appendChild(linha);
  });

  return tabela;
}

export function criarListagemClientes({ areaLista, aoEditar, aoExcluir }) {
  const callbacks = { onEditar: aoEditar, onExcluir: aoExcluir };

  function renderizar(clientes) {
    areaLista.replaceChildren();

    if (!clientes.length) {
      const vazio = document.createElement('p');
      vazio.className = 'lista-vazia';
      vazio.textContent = 'Nenhum cliente cadastrado ainda.';
      areaLista.appendChild(vazio);
      return;
    }

    const cartoes = document.createElement('div');
    cartoes.className = 'cartoes';
    clientes.forEach((cliente) => {
      cartoes.appendChild(criarCartao(cliente, callbacks));
    });

    const tabela = criarTabela(clientes, callbacks);
    areaLista.append(cartoes, tabela);
  }

  return { renderizar };
}