import express, { NextFunction, Request, Response } from 'express';
import 'dotenv/config';

import mongoSanitize from 'express-mongo-sanitize';

import { globalErrorHandler } from './middleware/globalErrorHandler';
import { connectMongoDb } from './config/connectMongoDb';
import { HTTP_STATUS_CODES } from './config/constants';
import { userRouter } from './entities/users/userRouter';
import { rateLimiter } from './config/rateLimiter';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { config } from './config/config';
import { authRouter } from './entities/auth/authRouter';

process.on('uncaughtException', (err) => {
  // eslint-disable-next-line no-console
  console.error(err);

  // eslint-disable-next-line no-magic-numbers
  process.exit(1);
});

const app = express();

connectMongoDb();

app.use(express.json({ limit: config.limits.maxPayloadSize }));
app.use(mongoSanitize());
app.use(rateLimiter);
app.use(helmet());
app.use(cookieParser());

const swaggerDocument = YAML.load('./apiDocs/swagger.yaml');

app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);

app.use(globalErrorHandler);

app.use('*', (req: Request, res: Response, next: NextFunction) => {
  res.status(HTTP_STATUS_CODES.NOT_FOUND_404).json({
    message: `Can't find ${req.originalUrl} on this server!`,
    status: 'error',
  });
});

export { app };
