import { Document, Types } from 'mongoose';
import { UserRole } from '../../../config/constants';

export interface UserMethods {
  setPassword(password: string): Promise<void>;
  isValidPassword(password: string): Promise<boolean>;
}

export interface IUser extends Document, UserMethods {
  _id: Types.ObjectId | string;
  email: string;
  firstName?: string;
  lastName?: string;
  password: string;
  role: UserRole;
  failedLoginAttempts: number;
  lockUntil?: Date;
}

export interface CreateUserDto {
  email: string;
  firstName?: string;
  lastName?: string;
  password: string;
  confirmPassword?: string;
  role: UserRole;
}

export type CreateUserProps = { data: CreateUserDto };
