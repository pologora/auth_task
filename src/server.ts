/* eslint-disable no-magic-numbers */
/* eslint-disable no-console */
import { app } from './app';
import { config } from './config/config';

const { port } = config.server;

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

process.on('unhandledRejection', (err: Error) => {
  console.error(err);

  server.close(() => {
    process.exit(1);
  });
});
