import { UserRole } from '../../constants/constants';
import { UserMethods } from '../users/types/types';

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
