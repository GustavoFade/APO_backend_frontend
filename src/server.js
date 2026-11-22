const { criarContainer } = require('./container');
const criarApp = require('./app');

const port = process.env.PORT || 3000;
const { clienteController } = criarContainer();
const app = criarApp(clienteController);

app.listen(port, () => {
  console.log(`Servidor ouvindo em http://localhost:${port}`);
});