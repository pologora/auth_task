import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../../core/BaseController';
import { UserService } from './UserService';
import { userCreateSchema, userUpdateSchema } from './validation';
import { AppError } from '../../core/AppError';
import { HTTP_STATUS_CODES } from '../../config/constants';

export class UserController extends BaseController {
  constructor(private userService: UserService) {
    super();
  }

  async create(req: Request, res: Response, _next: NextFunction) {
    const { error, value } = userCreateSchema.validate(req.body);

    if (error) {
      throw new AppError(error.message);
    }

    const user = await this.userService.create({ data: value });

    this.sendResponse({
      message: 'User created successfully.',
      data: user,
      res,
      statusCode: HTTP_STATUS_CODES.CREATED_201,
    });
  }

  async findOneById(req: Request, res: Response, _next: NextFunction) {
    const user = await this.userService.findOneById({ id: req.params.id });

    this.sendResponse({
      message: 'User retrieved successfully.',
      data: user,
      res,
      statusCode: HTTP_STATUS_CODES.SUCCESS_200,
    });
  }

  async findMany(_req: Request, res: Response, _next: NextFunction) {
    const users = await this.userService.findMany();

    this.sendResponse({
      message: 'Users retrieved successfully.',
      data: users,
      res,
      statusCode: HTTP_STATUS_CODES.SUCCESS_200,
    });
  }

  async update(req: Request, res: Response, _next: NextFunction) {
    const { error, value } = userUpdateSchema.validate(req.body);

    if (error) {
      throw new AppError(error.message);
    }

    const updatedUser = await this.userService.update({ data: value, id: req.params.id });

    this.sendResponse({
      message: 'User updated successfully.',
      data: updatedUser,
      res,
      statusCode: HTTP_STATUS_CODES.SUCCESS_200,
    });
  }

  async remove(req: Request, res: Response, _next: NextFunction) {
    await this.userService.remove({ id: req.params.id });

    this.sendResponse({
      message: 'User removed successfully.',
      data: null,
      res,
      statusCode: HTTP_STATUS_CODES.NO_CONTENT_204,
    });
  }
}
