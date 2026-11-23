# Gestão de Clientes (APO)

Aplicação web para **cadastrar, listar, editar e excluir clientes**, com front-end em HTML/CSS/JavaScript e API REST em **Node.js + Express 5**. O back-end usa camadas com inversão de dependência (repositório em memória); o front consome a API via `fetch` quando servido pelo mesmo servidor.

## Entregas por etapa (commits)

Use `git checkout <hash>` para demonstrar cada fase. Volte à versão final com `git checkout main`.

| Etapa | Commit | Descrição |
| --- | --- | --- |
| **1 – Front-end (mock)** | `bd83d57` | Interface CRUD com dados simulados em `mockClienteStore.js` |
| **2 – Back-end (API)** | `68da4ec` | API REST Express, CRUD em memória, validações básicas |
| **3 – Integração** | `6627455` | Front conectado à API via `fetch`, README e fluxo completo |
| **Entrega final** | `13a7c1e` (branch `main`) | Refinos de código + validação de e-mail e telefone |

### Como executar cada etapa

**Etapa 1** — só front-end (sem Node):

```powershell
git checkout bd83d57
npx --yes serve public -p 5500
```

Abra [http://localhost:5500](http://localhost:5500). Os dados ficam em memória no navegador (mock).

**Etapa 2** — só API:

```powershell
git checkout 68da4ec
npm install
npm start
```

Teste com Postman/Insomnia ou curls nas rotas da seção [Rotas da API](#rotas-da-api). Na versão final do projeto, use `.\scripts\test-api.ps1`.

**Etapa 3 e entrega final** — integrado:

```powershell
git checkout main
npm install
npm start
```

Abra [http://localhost:3000](http://localhost:3000) (Express serve `public/` e a API na mesma origem).

## Stack

| Camada | Tecnologia |
| --- | --- |
| Interface | HTML5, CSS (mobile-first), JavaScript (módulos ES) |
| API | Express 5, JSON, middlewares de validação e erro |
| Persistência | Repositório em memória (`InMemoryClienteRepository`) |

## Como executar (versão final)

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

## Validações

Aplicadas no **front-end** (`public/js/domain/validarCliente.js`) e no **back-end** (domínio + middleware `validateClienteBody`).

| Campo | Regra |
| --- | --- |
| Nome | Obrigatório |
| E-mail | Obrigatório; formato válido (`user@dominio.tld`); máximo **254** caracteres |
| Telefone | Opcional; se informado, máximo **15** caracteres |

Erros de validação na API retornam **400** com `{ "erro": "mensagem" }`. A interface exibe a mesma mensagem na área `#mensagens`.

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

- [x] CRUD completo pela interface (criar → listar → editar → excluir)
- [x] Cadastro com nome ou e-mail vazio → mensagem de erro na UI (validação local e/ou API 400)
- [x] E-mail inválido ou telefone acima do limite → mensagem de validação
- [x] Editar ou excluir ID inexistente → feedback de não encontrado e lista sincronizada
- [x] Servidor parado → mensagem de falha de comunicação ao carregar ou salvar
- [x] Layout responsivo em ~320px, 768px e 1280px (sem rolagem horizontal)

Cenários detalhados em [docs/cenarios-bdd.md](docs/cenarios-bdd.md).

## Evidências de teste

| Verificação | Como foi executado | Resultado esperado |
| --- | --- | --- |
| CRUD API | `.\scripts\test-api.ps1` com `npm start` | POST 201, GET/PUT 200, DELETE 204, 404 em ID ausente, 400 em corpo inválido |
| CRUD UI | Navegador em `http://localhost:3000` | Mensagens de sucesso; lista atualizada após cada operação |
| Campos obrigatórios / formato | Formulário com e-mail inválido ou telefone longo | Mensagem em `#mensagens` sem gravar registro inválido |
| Registro inexistente | Excluir/editar após recarregar dados ou ID removido | “Cliente não encontrado. A lista será atualizada.” + recarga da lista |
| Falha de rede | `npm start` interrompido e recarregar a página | “Falha de comunicação com o servidor…” |
| Responsividade | DevTools (320 / 768 / 1280 px) | Cartões no mobile, tabela no desktop; sem overflow horizontal |

Registre data e prints na entrega ao professor, se solicitado.

## Estrutura do projeto

```text
public/          # Interface estática
src/             # API Express (controllers, services, repositories, middlewares)
scripts/         # test-api.ps1
docs/            # Cenários BDD (apoio aos testes)
```

## Licença

ISC