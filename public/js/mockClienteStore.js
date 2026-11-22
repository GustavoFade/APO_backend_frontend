const clientes = [
  {
    id: 1,
    nome: 'Maria Oliveira',
    email: 'maria@exemplo.com',
    telefone: '11987654321',
  },
];

let proximoId = 2;

function clonarLista() {
  return clientes.map((c) => ({ ...c }));
}

export const clienteDataSource = {
  async listar() {
    return clonarLista();
  },

  async buscar(id) {
    const cliente = clientes.find((c) => c.id === Number(id));
    if (!cliente) {
      const erro = new Error('Cliente não encontrado.');
      erro.status = 404;
      throw erro;
    }
    return { ...cliente };
  },

  async criar({ nome, email, telefone = '' }) {
    const novo = {
      id: proximoId++,
      nome: nome.trim(),
      email: email.trim(),
      telefone: (telefone || '').trim(),
    };
    clientes.push(novo);
    return { ...novo };
  },

  async atualizar(id, { nome, email, telefone = '' }) {
    const indice = clientes.findIndex((c) => c.id === Number(id));
    if (indice === -1) {
      const erro = new Error('Cliente não encontrado.');
      erro.status = 404;
      throw erro;
    }
    clientes[indice] = {
      ...clientes[indice],
      nome: nome.trim(),
      email: email.trim(),
      telefone: (telefone || '').trim(),
    };
    return { ...clientes[indice] };
  },

  async excluir(id) {
    const indice = clientes.findIndex((c) => c.id === Number(id));
    if (indice === -1) {
      const erro = new Error('Cliente não encontrado.');
      erro.status = 404;
      throw erro;
    }
    clientes.splice(indice, 1);
    return null;
  },
};