import { Response } from 'express';
import { StatusCode } from '../constants/constants';

type SendResponseProps = {
  res: Response;
  statusCode: StatusCode;
  data: object | null;
  message: string;
};

export class BaseController {
  protected sendResponse({ res, statusCode, data, message }: SendResponseProps) {
    return res.status(statusCode).json({
      status: 'success',
      message,
      data,
    });
  }
}
