const { criarContainer } = require('./container');
const createApp = require('./app');

const port = process.env.PORT || 3000;
const container = criarContainer();
const app = createApp(container);

app.listen(port, () => {
  console.log(`Servidor ouvindo em http://localhost:${port}`);
});