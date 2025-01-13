import { NextFunction, Request, Response } from 'express';

import { AuthService } from './AuthService';
import { APP_MODES, HTTP_STATUS_CODES } from '../../config/constants';
import { config } from '../../config/config';
import { AppError } from '../../core/AppError';
import { Schema } from 'joi';
import { BaseResponseHandler } from '../../core/BaseResponseHandler';
import { IUser } from '../users/types/types';

type SetJWTCookieProps = {
  res: Response;
  token: string;
};

export class AuthController extends BaseResponseHandler<IUser> {
  constructor(private authService: AuthService, private userRegisterSchema: Schema, private userLoginSchema: Schema) {
    super();
  }

  private setJWTCookie({ res, token }: SetJWTCookieProps) {
    res.cookie(config.cookie.jwtToken.name, token, {
      maxAge: config.cookie.jwtToken.maxAge,
      httpOnly: true,
      secure: process.env.NODE_ENV === APP_MODES.production,
    });
  }

  async register(req: Request, res: Response, _next: NextFunction) {
    const { error, value } = this.userRegisterSchema.validate(req.body);

    if (error) {
      throw new AppError(error.message);
    }

    const { user, token } = await this.authService.register({ data: value });

    this.setJWTCookie({ res, token });

    this.sendResponse({
      res,
      data: user,
      message: 'User registered successfully.',
      statusCode: HTTP_STATUS_CODES.CREATED_201,
    });
  }

  async login(req: Request, res: Response, _next: NextFunction) {
    const { error, value } = this.userLoginSchema.validate(req.body);

    if (error) {
      throw new AppError(error.message);
    }

    const { email, password } = value;
    const { user, token } = await this.authService.login({ email, password });

    this.setJWTCookie({ res, token });

    this.sendResponse({
      res,
      statusCode: HTTP_STATUS_CODES.SUCCESS_200,
      data: user,
      message: 'User login successfully',
    });
  }

  async logout(_req: Request, res: Response, _next: NextFunction) {
    res.clearCookie(config.cookie.jwtToken.name);

    this.sendResponse({
      res,
      statusCode: HTTP_STATUS_CODES.NO_CONTENT_204,
      data: null,
      message: 'User logout successfully',
    });
  }
}
