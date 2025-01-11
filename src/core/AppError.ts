import { HTTP_STATUS_CODES, StatusCode } from '../constants/constants';

export class AppError extends Error {
  statusCode: StatusCode;
  isOperational: boolean;

  constructor(message: string, statusCode: StatusCode = HTTP_STATUS_CODES.BAD_REQUEST_400) {
    super(message);

    this.message = message;
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}
