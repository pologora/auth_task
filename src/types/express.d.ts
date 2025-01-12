import { IUser } from '../entities/users/types/types';

declare module 'express' {
  interface Request {
    user?: IUser;
  }
}
