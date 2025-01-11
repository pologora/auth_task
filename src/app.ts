import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import { envFilesMap } from './config/envFilesMap';
dotenv.config({ path: envFilesMap.get(process.env.NODE_ENV!) });

import mongoSanitize from 'express-mongo-sanitize';

import { globalErrorHandler } from './utils/globalErrorHandler';
import { connectMongoDb } from './config/connectMongoDb';
import { HTTP_STATUS_CODES } from './constants/statusCodes';
import { userRouter } from './entities/users/user.router';
import { rateLimiter } from './config/rateLimiter';
import helmet from 'helmet';
import { config } from './config/config';

const app = express();

connectMongoDb();

// body parser with size limit
app.use(express.json({ limit: config.limits.maxPayloadSize }));
// sanitize user input
app.use(mongoSanitize());
// rateLimiter
app.use(rateLimiter);
// HTTP response headers
app.use(helmet());

// routes
app.use('api/v1/users', userRouter);
app.use('api/v1/auth', () => {});

app.use(globalErrorHandler);

app.use('*', (req: Request, res: Response, next: NextFunction) => {
  res.status(HTTP_STATUS_CODES.NOT_FOUND_404).json({
    message: `Can't find ${req.originalUrl} on this server!`,
    status: 'error',
  });
});

export { app };
