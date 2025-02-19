import { HTTP_STATUS_CODES, StatusCode } from '../config/constants';

export class AppError extends Error {
  statusCode: StatusCode;
  isOperational: boolean;
  code?: number;
  keyPattern?: object;

  constructor(message: string, statusCode: StatusCode = HTTP_STATUS_CODES.BAD_REQUEST_400) {
    super(message);

    this.message = message;
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}
