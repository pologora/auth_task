/* eslint-disable no-magic-numbers */
export const config = {
  database: {
    database: process.env.MONGO_DATABASE,
    password: process.env.MONGO_PASSWORD,
    username: process.env.MONGO_USERNAME,
  },
  limits: {
    maxPayloadSize: process.env.MAX_PAYLOAD_SIZE || '10kb',
    requestPerWindow: Number(process.env.REQUESTS_PER_WINDOW) || 100,
    windowMinutes: Number(process.env.WINDOW_MINUTES) || 15,
  },
  server: {
    port: process.env.PORT || '3000',
  },
};
