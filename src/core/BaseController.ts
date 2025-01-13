import { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS_CODES } from '../config/constants';
import { BaseService } from './BaseService';
import { Schema } from 'joi';
import { AppError } from './AppError';
import { BaseResponseHandler } from './BaseResponseHandler';

export class BaseController<T> extends BaseResponseHandler<T> {
  constructor(
    protected service: BaseService<T>,
    private createRecordSchema: Schema,
    private updateRecordSchema: Schema,
    private queryParamsSchema: Schema,
    protected entityName: string,
  ) {
    super();
  }

  async create(req: Request, res: Response, _next: NextFunction) {
    const { error, value } = this.createRecordSchema.validate(req.body);

    if (error) {
      throw new AppError(error.message);
    }

    const record = await this.service.create({ data: value });

    this.sendResponse({
      message: `${this.entityName} created successfully.`,
      data: record,
      res,
      statusCode: HTTP_STATUS_CODES.CREATED_201,
    });
  }

  async findOneById(req: Request, res: Response, _next: NextFunction) {
    const record = await this.service.findOneById({ id: req.params.id });

    this.sendResponse({
      message: `${this.entityName} retrieved successfully.`,
      data: record,
      res,
      statusCode: HTTP_STATUS_CODES.SUCCESS_200,
    });
  }

  async findAll(req: Request, res: Response, _next: NextFunction) {
    const { error, value } = this.queryParamsSchema.validate(req.query);

    if (error) {
      throw new AppError(error.message);
    }

    const records = await this.service.findAll({ queryParams: value });

    this.sendResponse({
      message: `${this.entityName}s retrieved successfully.`,
      data: records,
      res,
      statusCode: HTTP_STATUS_CODES.SUCCESS_200,
    });
  }

  async update(req: Request, res: Response, _next: NextFunction) {
    const { error, value } = this.updateRecordSchema.validate(req.body);

    if (error) {
      throw new AppError(error.message);
    }

    const updatedRecord = await this.service.update({ data: value, id: req.params.id });

    this.sendResponse({
      message: `${this.entityName} updated successfully.`,
      data: updatedRecord,
      res,
      statusCode: HTTP_STATUS_CODES.SUCCESS_200,
    });
  }

  async remove(req: Request, res: Response, _next: NextFunction) {
    await this.service.remove({ id: req.params.id });

    this.sendResponse({
      message: `${this.entityName} removed successfully.`,
      data: null,
      res,
      statusCode: HTTP_STATUS_CODES.NO_CONTENT_204,
    });
  }
}
