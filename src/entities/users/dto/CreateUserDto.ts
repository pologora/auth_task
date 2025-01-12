import { UserRole } from '../../../config/constants';
import { UserMethods } from '../types/types';

export interface CreateUserDto extends Document, UserMethods {
  email: string;
  firstName?: string;
  lastName?: string;
  password: string;
  confirmPassword?: string;
  role: UserRole;
  failedLoginAttempts: number;
  lockUntil?: Date;
}
