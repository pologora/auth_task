/* eslint-disable no-magic-numbers */

const oneDayInMs = 86_400_000;

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
  password: {
    saltRounds: Number(process.env.PASSWORD_HASH_SALT_ROUNDS) || 10,
    minLength: Number(process.env.MIN_PASSWORD_LENGTH) || 8,
  },
  cookie: {
    jwtToken: {
      name: 'jwtToken',
      maxAge: Number(process.env.COOKIE_MAX_AGE_MS) || oneDayInMs,
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expireIn: process.env.JWT_EXPIRES_IN || '1d',
  },
};
