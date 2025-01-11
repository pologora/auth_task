import { app } from './app';
import { config } from './config/config';

const { port } = config.server;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${port}`);
});
