import { NextFunction, Request, Response } from 'express';
import { config } from '../config/config';
import { AppError } from '../core/AppError';
import { HTTP_STATUS_CODES } from '../config/constants';
import { UserService } from '../entities/users/UserService';
import { User } from '../entities/users/User';
import { validateJWT } from '../utils/jwtFunction';

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies[config.cookie.jwtToken.name];

  if (!token) {
    return next(new AppError('Not authorized', HTTP_STATUS_CODES.UNAUTHORIZED_401));
  }

  try {
    const userService = new UserService(User);

    const { userId } = await validateJWT({ token });

    const user = await userService.findOneById({ id: userId });

    req.user = user;

    next();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_error) {
    return next(new AppError('Not authorized', HTTP_STATUS_CODES.UNAUTHORIZED_401));
  }
};
