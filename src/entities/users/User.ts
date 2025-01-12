import { model, Schema } from 'mongoose';
import { USER_ROLES } from '../../config/constants';
import { CreateUserDto } from './dto/CreateUserDto';
import { PasswordService } from '../../core/PasswordService';

const UserSchema = new Schema<CreateUserDto>({
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
});

UserSchema.methods.setPassword = async function (password: string) {
  this.password = await PasswordService.hashPassword({ password });
};

UserSchema.methods.isValidPassword = async function (password: string): Promise<boolean> {
  return await PasswordService.comparePassword({ password, hashedPassword: this.password });
};

const User = model<CreateUserDto>('User', UserSchema);

export { User };
