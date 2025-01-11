import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import { envFilesMap } from './config/envFilesMap';
dotenv.config({ path: envFilesMap.get(process.env.NODE_ENV!) });

import mongoSanitize from 'express-mongo-sanitize';

import { globalErrorHandler } from './utils/globalErrorHandler';
import { connectMongoDb } from './config/connectMongoDb';
import { HTTP_STATUS_CODES } from './constants/statusCodes';
import { userRouter } from './entities/users/router';
import { rateLimiter } from './config/rateLimiter';

const app = express();

connectMongoDb();

// body parser
app.use(express.json());
// sanitize user input
app.use(mongoSanitize());
// rateLimiter
app.use(rateLimiter);

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
