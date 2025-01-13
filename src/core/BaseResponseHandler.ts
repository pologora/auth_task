import { Response } from 'express';
import { StatusCode } from '../config/constants';

export class BaseResponseHandler<T> {
  protected sendResponse({
    res,
    statusCode,
    data,
    message,
  }: {
    res: Response;
    statusCode: StatusCode;
    data: Awaited<T> | null | T[];
    message: string;
  }) {
    return res.status(statusCode).json({
      status: 'success',
      message,
      data,
    });
  }
}
