import { model, Schema } from 'mongoose';
import { USER_ROLES } from '../../config/constants';
import { PasswordService } from '../../core/PasswordService';
import { IUser } from './types/types';

const UserSchema = new Schema<IUser>(
  {
    email: {
      lowercase: true,
      required: [true, 'Email address is required'],
      type: String,
      unique: true,
    },
    firstName: { type: String },
    lastName: { type: String },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      enum: Object.values(USER_ROLES),
      required: true,
      type: String,
    },
    failedLoginAttempts: {
      default: 0,
      select: false,
      type: Number,
    },
    lockUntil: {
      select: false,
      type: Date,
    },
  },
  { versionKey: false },
);

UserSchema.methods.setPassword = async function (password: string) {
  this.password = await PasswordService.hashPassword({ password });
};

UserSchema.methods.isValidPassword = async function (password: string): Promise<boolean> {
  return await PasswordService.comparePassword({ password, hashedPassword: this.password });
};

const User = model<IUser>('User', UserSchema);

export { User };
