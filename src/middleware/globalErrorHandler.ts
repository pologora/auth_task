import { NextFunction, Request, Response } from 'express';

import { AppError } from '../core/AppError';
import { APP_MODES, ERROR_MESSAGES, HTTP_STATUS_CODES, StatusCode } from '../config/constants';

const sendDevError = (err: AppError, res: Response, statusCode: StatusCode) => {
  const { message, stack } = err;
  res.status(statusCode).json({ err, message, stack, status: 'error' });
};

const sendProductionError = (err: AppError, res: Response, statusCode: StatusCode) => {
  const { message, isOperational } = err;
  const clientMessage = isOperational ? message : ERROR_MESSAGES.defaultUserFriendly;

  res.status(statusCode).json({ message: clientMessage, status: 'error' });
};

export const globalErrorHandler = (err: AppError, _req: Request, res: Response, _next: NextFunction) => {
  const statusCode = err.statusCode || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR_500;

  const isProductionMode = process.env.NODE_ENV === APP_MODES.production;

  const mongoDbDuplicateKeyErrorCode = 11000;
  if (err.code === mongoDbDuplicateKeyErrorCode) {
    err = new AppError(`Field ${Object.keys(err.keyPattern!)[0]} already exists`);
  }

  if (isProductionMode) {
    sendProductionError(err, res, statusCode);
  } else {
    sendDevError(err, res, statusCode);
  }
};
