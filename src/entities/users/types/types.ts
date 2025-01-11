import { Types } from 'mongoose';
import { UserRole } from '../../../constants/constants';
import { CreateUserDto } from '../../dto/CreateUserDto';
import { UpdateUserDto } from '../../dto/UpdateUserDto';

export interface IUser {
  _id: Types.ObjectId | string;
  email: string;
  firstName?: string;
  lastName?: string;
  password: string;
  role: UserRole;
  failedLoginAttempts: number;
  lockUntil?: Date;
}

export interface UserMethods {
  setPassword(password: string): Promise<void>;
  isValidPassword(password: string): Promise<boolean>;
}

export type CreateUserProps = { data: CreateUserDto };
export type FindOneByIdProps = { id: string };
export type UpdateUserProps = { data: UpdateUserDto; id: string };
export type DeleteUserProps = { id: string };
