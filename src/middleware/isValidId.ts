import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';
import { AppError } from '../core/AppError';

export const isValidId = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (!id || !Types.ObjectId.isValid(id)) {
    return next(new AppError('Invalid record ID.'));
  }

  next();
};
