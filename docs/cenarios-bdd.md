# Cenários BDD – Gestão de Clientes (APO)

Documento de apoio à implementação e aos testes manuais. Cada cenário segue **Dado / Quando / Então** (Given / When / Then) e está ligado às etapas do roteiro da disciplina.

## Atores e escopo

| Ator | Descrição |
| --- | --- |
| **Usuário** | Pessoa que usa a página web para gerenciar clientes |
| **Sistema (front)** | HTML, CSS e JavaScript no navegador |
| **API** | Servidor Node.js com Express (Etapa 2 em diante) |

**Campos do cliente:** `nome` (obrigatório), `email` (obrigatório), `telefone` (opcional na UI; se preenchido, deve ser exibido).

---

## Etapa 1 – Front-end com dados simulados

### E1.01 – Exibir página inicial

- **Dado** que o usuário abre a aplicação no navegador  
- **Quando** a página termina de carregar  
- **Então** deve ver o título da aplicação, o formulário de cadastro (nome, e-mail, telefone) e a área de listagem de clientes  
- **E** a interface deve estar organizada e legível em telas pequenas e grandes (layout responsivo)

### E1.02 – Listar clientes iniciais (mock)

- **Dado** que existem clientes no armazenamento simulado em memória  
- **Quando** a página é carregada  
- **Então** a lista deve exibir nome, e-mail e telefone de cada cliente cadastrado  
- **E** se não houver clientes, deve aparecer uma mensagem indicando lista vazia

### E1.03 – Cadastrar cliente válido

- **Dado** que o usuário preencheu **nome** e **e-mail** com valores não vazios  
- **Quando** confirma o cadastro (envio do formulário)  
- **Então** um novo cliente deve aparecer na lista  
- **E** o formulário deve ser limpo ou voltar ao estado de novo cadastro  
- **E** uma mensagem de sucesso pode ser exibida na área de feedback

### E1.04 – Impedir cadastro sem campos obrigatórios

- **Dado** que o usuário deixou **nome** ou **e-mail** vazio  
- **Quando** tenta enviar o formulário  
- **Então** o cadastro **não** deve ser concluído  
- **E** o usuário deve ver validação ou mensagem informando os campos obrigatórios  
- **E** a lista não deve ser alterada indevidamente

### E1.05 – Cadastrar apenas com telefone opcional vazio

- **Dado** que nome e e-mail estão preenchidos e telefone está vazio  
- **Quando** o usuário cadastra  
- **Então** o cliente deve ser criado  
- **E** na lista o telefone pode aparecer vazio ou com texto equivalente (ex.: “—”)

### E1.06 – Iniciar edição de um cliente

- **Dado** que existe pelo menos um cliente na lista  
- **Quando** o usuário aciona **Editar** em um registro  
- **Então** o formulário deve ser preenchido com os dados desse cliente  
- **E** o envio seguinte deve **atualizar** o mesmo registro, não criar duplicata

### E1.07 – Atualizar cliente válido

- **Dado** que o usuário está editando um cliente existente  
- **Quando** altera os dados com nome e e-mail válidos e confirma  
- **Então** a lista deve refletir os novos valores  
- **E** os demais clientes permanecem inalterados

### E1.08 – Excluir cliente

- **Dado** que existe um cliente na lista  
- **Quando** o usuário confirma a exclusão desse cliente  
- **Então** o registro deve sumir da lista  
- **E** os outros registros permanecem

### E1.09 – Cancelar ou evitar exclusão acidental (recomendado)

- **Dado** que o usuário acionou excluir  
- **Quando** cancela a confirmação (se houver diálogo)  
- **Então** o cliente deve permanecer na lista

### E1.10 – Uso em viewport móvel

- **Dado** que o usuário acessa a página em largura de aproximadamente 320–480px (celular)  
- **Quando** visualiza formulário e lista  
- **Então** não deve haver barra de rolagem horizontal no conteúdo principal  
- **E** campos e botões devem ser legíveis e clicáveis sem zoom  
- **E** cadastrar, editar e excluir permanecem acessíveis

### E1.11 – Uso em tablet e desktop

- **Dado** que o usuário amplia a janela para aproximadamente 768px ou mais  
- **Quando** interage com a mesma página  
- **Então** o layout deve reorganizar (ex.: mais espaço entre formulário e lista, tabela ou cards alinhados)  
- **E** a hierarquia visual (título, formulário, listagem) permanece clara  
- **E** nenhuma funcionalidade fica oculta apenas por falta de espaço

---

## Etapa 2 – API REST (testes com curl)

Base URL assumida: `http://localhost:3000`. Corpo JSON: `{ "nome", "email", "telefone" }`.

### E2.01 – Listar todos os clientes

- **Dado** que a API está em execução  
- **Quando** é enviada `GET /clientes`  
- **Então** a resposta deve ter status **200**  
- **E** o corpo deve ser um array JSON (vazio ou com clientes)

### E2.02 – Consultar cliente existente

- **Dado** que existe um cliente com identificador `id`  
- **Quando** é enviada `GET /clientes/:id` com esse `id`  
- **Então** a resposta deve ter status **200**  
- **E** o corpo deve conter `id`, `nome`, `email` e `telefone` do cliente

### E2.03 – Consultar cliente inexistente

- **Dado** que não existe cliente com o `id` informado  
- **Quando** é enviada `GET /clientes/:id`  
- **Então** a resposta deve ter status **404**  
- **E** o corpo deve descrever o erro em JSON

### E2.04 – Cadastrar cliente válido

- **Dado** um JSON com `nome` e `email` preenchidos  
- **Quando** é enviada `POST /clientes` com `Content-Type: application/json`  
- **Então** a resposta deve ter status **201**  
- **E** o corpo deve retornar o cliente criado, incluindo `id` gerado pelo servidor

### E2.05 – Rejeitar cadastro sem nome ou e-mail

- **Dado** um JSON com `nome` vazio e/ou `email` vazio  
- **Quando** é enviada `POST /clientes`  
- **Então** a resposta deve ter status **400**  
- **E** nenhum cliente inválido deve ser persistido

### E2.06 – Atualizar cliente existente

- **Dado** um cliente existente e JSON válido  
- **Quando** é enviada `PUT /clientes/:id`  
- **Então** a resposta deve ter status **200**  
- **E** o corpo deve refletir os dados atualizados

### E2.07 – Atualizar cliente inexistente

- **Dado** um `id` que não existe no repositório  
- **Quando** é enviada `PUT /clientes/:id` com corpo válido  
- **Então** a resposta deve ter status **404**

### E2.08 – Atualizar com dados inválidos

- **Dado** um cliente existente  
- **Quando** é enviada `PUT /clientes/:id` sem `nome` ou sem `email`  
- **Então** a resposta deve ter status **400**

### E2.09 – Excluir cliente existente

- **Dado** um cliente existente  
- **Quando** é enviada `DELETE /clientes/:id`  
- **Então** a resposta deve ter status **204** (sem corpo) ou **200** conforme implementação documentada  
- **E** uma nova `GET /clientes/:id` deve retornar **404**

### E2.10 – Excluir cliente inexistente

- **Dado** um `id` inexistente  
- **Quando** é enviada `DELETE /clientes/:id`  
- **Então** a resposta deve ter status **404**

### E2.11 – Rota desconhecida

- **Dado** que a API está em execução  
- **Quando** é enviada uma requisição para rota não definida (ex.: `GET /rotas-invalidas`)  
- **Então** a resposta deve ter status **404**  
- **E** o middleware de erro deve tratar de forma consistente

### E2.12 – Persistência em memória entre requisições

- **Dado** que um cliente foi criado via `POST /clientes`  
- **Quando** é enviada `GET /clientes` na mesma execução do servidor  
- **Então** o cliente criado deve aparecer na listagem  
- **E** após reiniciar o servidor, os dados podem ser perdidos (comportamento esperado para armazenamento em memória)

---

## Etapa 3 – Integração front-end e API

Pré-condição comum: servidor Express servindo a API e os arquivos estáticos; página aberta em `http://localhost:3000` (ou origem equivalente).

### E3.01 – Carregar listagem a partir da API

- **Dado** que existem clientes na API  
- **Quando** o usuário abre ou recarrega a página  
- **Então** a listagem deve ser preenchida via `fetch` em `GET /clientes`  
- **E** não deve depender mais do mock local da Etapa 1

### E3.02 – Cadastrar cliente pela interface integrada

- **Dado** que o formulário está válido  
- **Quando** o usuário cadastra  
- **Então** o front deve enviar `POST /clientes`  
- **E** em sucesso a lista deve ser atualizada e uma mensagem de sucesso exibida

### E3.03 – Editar cliente pela interface integrada

- **Dado** um cliente visível na lista  
- **Quando** o usuário edita e salva  
- **Então** o front deve enviar `PUT /clientes/:id`  
- **E** a lista deve refletir a alteração após resposta bem-sucedida

### E3.04 – Excluir cliente pela interface integrada

- **Dado** um cliente visível na lista  
- **Quando** o usuário confirma exclusão  
- **Então** o front deve enviar `DELETE /clientes/:id`  
- **E** o item deve desaparecer da lista após sucesso

### E3.05 – Exibir erro da API em cadastro inválido

- **Dado** que o usuário envia dados que a API rejeita (nome/e-mail vazios)  
- **Quando** a API responde com **400**  
- **Então** a interface deve mostrar mensagem de erro compreensível  
- **E** o usuário pode corrigir e tentar novamente

### E3.06 – Exibir erro ao alterar registro inexistente

- **Dado** um estado inconsistente (ex.: registro removido em outra aba) ou `id` inválido  
- **Quando** o front tenta `PUT` ou `DELETE` e a API retorna **404**  
- **Então** a interface deve informar que o cliente não foi encontrado  
- **E** a listagem deve ser recarregada ou sincronizada quando aplicável

### E3.07 – Falha de comunicação com a API

- **Dado** que o servidor back-end não está acessível  
- **Quando** o usuário tenta carregar a lista ou salvar um cliente  
- **Então** a interface deve exibir mensagem de falha de comunicação/rede  
- **E** não deve quebrar silenciosamente (sem feedback)

### E3.08 – Fluxo completo de ponta a ponta

- **Dado** API e front integrados  
- **Quando** o usuário executa em sequência: cadastrar → listar → editar → excluir  
- **Então** cada operação deve concluir com feedback adequado  
- **E** o estado final da lista deve corresponder ao estado na API (`GET /clientes`)

### E3.08b – Responsividade após integração (sem regressão)

- **Dado** a aplicação integrada servida pelo Express  
- **Quando** o usuário testa em mobile e desktop (mesmos breakpoints da Etapa 1)  
- **Então** o layout responsivo da Etapa 1 deve ser mantido  
- **E** mensagens de loading, sucesso e erro não devem quebrar o layout

---

## Organização e documentação (Etapa 3 / critérios gerais)

### E3.09 – README com instruções de execução

- **Dado** o repositório entregue  
- **Quando** outra pessoa segue o `README.md`  
- **Então** deve conseguir instalar dependências, iniciar o servidor e acessar a aplicação  
- **E** deve encontrar descrição das rotas da API

### E3.10 – Explicar comunicação cliente-servidor (apresentação)

- **Dado** a aplicação em demonstração  
- **Quando** o estudante apresenta ao professor  
- **Então** deve ser possível explicar: evento na UI → JavaScript → `fetch` → rota Express → resposta HTTP → atualização do DOM

---

## Matriz de rastreabilidade (requisito → cenários)

| Requisito do roteiro APO | Cenários |
| --- | --- |
| Formulário nome, e-mail, telefone | E1.01, E1.03–E1.05 |
| Listagem na página | E1.02, E1.03, E3.01 |
| CSS organizado e responsivo | E1.01, E1.10, E1.11 |
| Validação de obrigatórios (front) | E1.04, E1.05 |
| Dados simulados antes do back-end | E1.02–E1.09 |
| GET/POST/PUT/DELETE `/clientes` | E2.01–E2.10 |
| JSON e status HTTP coerentes | E2.03–E2.11 |
| Validação nome e e-mail (API) | E2.05, E2.08 |
| Testes da API (curl no lugar de Postman) | E2.01–E2.11 |
| Integração com `fetch` | E3.01–E3.04 |
| Mensagens sucesso/erro | E3.02, E3.05–E3.07 |
| Erros: campos vazios, id inexistente, falha API | E3.05–E3.07 |
| README e rotas documentadas | E3.09 |
| Apresentação do fluxo HTTP | E3.10 |

---

## Ordem sugerida de validação

1. Executar todos os cenários **E1.x** no navegador (Etapa 1).  
2. Subir a API e executar **E2.x** com `scripts/test-api.ps1` ou curls equivalentes.  
3. Integrar e executar **E3.x** manualmente na UI.  
4. Conferir **E3.09** lendo o README como um usuário novo.

Este arquivo é guia de comportamento esperado; a implementação deve satisfazer os cenários sem contradizer o roteiro da APO.