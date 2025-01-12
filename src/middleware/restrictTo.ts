import { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS_CODES, UserRole } from '../config/constants';
import { AppError } from '../core/AppError';

export const restrictTo =
  (...roles: Array<UserRole>) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    const { user } = req;

    if (!user) {
      return next(new AppError('Not authorized', HTTP_STATUS_CODES.UNAUTHORIZED_401));
    }

    const { role } = user;

    if (!roles.includes(role)) {
      return next(new AppError('User does not have the required permissions', HTTP_STATUS_CODES.FORBIDDEN_403));
    }

    next();
  };
