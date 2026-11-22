const seletores = {
  form: '#form-cliente',
  id: '#cliente-id',
  nome: '#nome',
  email: '#email',
  telefone: '#telefone',
  btnSalvar: '#btn-salvar',
  btnCancelar: '#btn-cancelar',
};

export function criarFormulario({ aoEnviar, aoCancelar }) {
  const form = document.querySelector(seletores.form);
  const campoId = document.querySelector(seletores.id);
  const campoNome = document.querySelector(seletores.nome);
  const campoEmail = document.querySelector(seletores.email);
  const campoTelefone = document.querySelector(seletores.telefone);
  const btnSalvar = document.querySelector(seletores.btnSalvar);
  const btnCancelar = document.querySelector(seletores.btnCancelar);

  function lerDados() {
    return {
      nome: campoNome.value,
      email: campoEmail.value,
      telefone: campoTelefone.value,
    };
  }

  function validarCliente({ nome, email }) {
    const nomeOk = nome.trim().length > 0;
    const emailOk = email.trim().length > 0;
    if (!nomeOk || !emailOk) {
      return 'Nome e e-mail são obrigatórios.';
    }
    return null;
  }

  function limpar() {
    campoId.value = '';
    form.reset();
    btnSalvar.textContent = 'Cadastrar';
    btnCancelar.hidden = true;
  }

  function preencherParaEdicao(cliente) {
    campoId.value = String(cliente.id);
    campoNome.value = cliente.nome;
    campoEmail.value = cliente.email;
    campoTelefone.value = cliente.telefone || '';
    btnSalvar.textContent = 'Salvar alterações';
    btnCancelar.hidden = false;
    campoNome.focus();
  }

  form.addEventListener('submit', async (evento) => {
    evento.preventDefault();
    const dados = lerDados();
    const mensagemValidacao = validarCliente(dados);
    if (mensagemValidacao) {
      aoEnviar({ tipo: 'validacao', mensagem: mensagemValidacao });
      return;
    }

    const id = campoId.value.trim();
    aoEnviar({
      tipo: 'salvar',
      id: id || null,
      dados: {
        nome: dados.nome.trim(),
        email: dados.email.trim(),
        telefone: dados.telefone.trim(),
      },
    });
  });

  btnCancelar.addEventListener('click', () => {
    limpar();
    aoCancelar?.();
  });

  return {
    limpar,
    preencherParaEdicao,
    definirCarregando(ativo) {
      btnSalvar.disabled = ativo;
      btnCancelar.disabled = ativo;
    },
  };
}