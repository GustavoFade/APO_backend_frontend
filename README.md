# Gestão de Clientes (APO)

Aplicação web para **cadastrar, listar, editar e excluir clientes**, com front-end em HTML/CSS/JavaScript e API REST em **Node.js + Express 5**. O back-end usa camadas com inversão de dependência (repositório em memória); o front consome a API via `fetch` quando servido pelo mesmo servidor.

## Stack

| Camada | Tecnologia |
| --- | --- |
| Interface | HTML5, CSS (mobile-first), JavaScript (módulos ES) |
| API | Express 5, JSON, middlewares de validação e erro |
| Persistência | Repositório em memória (`InMemoryClienteRepository`) |

## Como executar

```bash
npm install
npm start
```

Abra no navegador: [http://localhost:3000](http://localhost:3000)

Porta alternativa: defina a variável `PORT`.

### Testar só a API (curl)

Com o servidor em execução:

```powershell
.\scripts\test-api.ps1
```

## Rotas da API

| Método | Rota | Sucesso | Descrição |
| --- | --- | --- | --- |
| `GET` | `/clientes` | 200 | Lista todos os clientes |
| `GET` | `/clientes/:id` | 200 / 404 | Busca por ID |
| `POST` | `/clientes` | 201 / 400 | Cria cliente (`nome` e `email` obrigatórios) |
| `PUT` | `/clientes/:id` | 200 / 400 / 404 | Atualiza cliente |
| `DELETE` | `/clientes/:id` | 204 / 404 | Remove cliente |

Corpo JSON de exemplo:

```json
{
  "nome": "Ana Silva",
  "email": "ana@exemplo.com",
  "telefone": "11999998888"
}
```

Erros retornam JSON: `{ "erro": "mensagem" }`.

## Fluxo cliente → servidor

1. O usuário preenche o formulário ou clica em **Editar** / **Excluir** na lista.
2. O `app.js` delega para `formulario.js` ou `clientes.js`.
3. `api.js` envia `fetch` para `/clientes` (mesma origem em `localhost:3000`).
4. O Express encaminha para `clienteRoutes` → `clienteController` → `clienteService` → repositório.
5. A resposta HTTP (JSON ou 204) volta ao front; a UI atualiza o DOM e exibe mensagens em `#mensagens`.

## Checklist de testes manuais (Etapa 3)

- [ ] CRUD completo pela interface (criar → listar → editar → excluir)
- [ ] Cadastro com nome ou e-mail vazio → mensagem de erro da API na UI
- [ ] Editar ou excluir ID inexistente → feedback de não encontrado e lista sincronizada
- [ ] Servidor parado → mensagem de falha de comunicação ao carregar ou salvar
- [ ] Layout responsivo em ~320px, 768px e 1280px (sem rolagem horizontal)

Cenários detalhados em [docs/cenarios-bdd.md](docs/cenarios-bdd.md).

## Estrutura do projeto

```text
public/          # Interface estática
src/             # API Express (controllers, services, repositories, middlewares)
scripts/         # test-api.ps1
docs/            # Cenários BDD
```

## Licença

ISC