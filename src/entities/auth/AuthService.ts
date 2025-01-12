import { Document, Model, Types } from 'mongoose';
import { CreateUserDto } from '../users/dto/CreateUserDto';
import { IUser } from '../users/types/types';
import { UserService } from '../users/UserService';
import { AppError } from '../../core/AppError';
import { ERROR_MESSAGES, HTTP_STATUS_CODES } from '../../config/constants';
import { JWTCreateFunction } from '../../utils/jwtFunction';
import { config } from '../../config/config';

type RegisterProps = {
  data: CreateUserDto;
};

type LoginProps = {
  email: string;
  password: string;
};

type UserDocument = Document<unknown, object, CreateUserDto> &
  CreateUserDto &
  Required<{ _id: Types.ObjectId }> & { __v: number };

export class AuthService {
  constructor(
    private user: Model<CreateUserDto>,
    private userService: UserService,
    private createJWT: JWTCreateFunction,
  ) {}

  async register({ data }: RegisterProps): Promise<{ user: IUser; token: string }> {
    const user = await this.userService.create({ data });

    const token = await this.createJWT({ userId: user!._id.toString() });

    return { user, token };
  }

  async login({ email, password }: LoginProps): Promise<{ user: Partial<IUser>; token: string }> {
    const user = await this.findUserByEmail(email);

    if (!user) {
      throw new AppError(ERROR_MESSAGES.invalidCredentials, HTTP_STATUS_CODES.UNAUTHORIZED_401);
    }

    await this.checkAndHandleLockStatus(user);

    await this.validatePassword(user, password);

    const token = await this.createJWT({ userId: user._id.toString() });

    const userForResponse = this.prepareUserForResponse(user);

    return { user: userForResponse, token };
  }

  prepareUserForResponse(user: UserDocument) {
    return {
      ...user.toObject(),
      password: undefined,
      failedLoginAttempts: undefined,
      lockUntil: undefined,
    } as Partial<IUser>;
  }

  private async checkAndHandleLockStatus(user: UserDocument): Promise<void> {
    const { lockUntil } = user;
    if (lockUntil) {
      if (Date.now() < lockUntil.getTime()) {
        const lockErrorMessage = ERROR_MESSAGES.lockedTooManyFailedLoginAttempts.replace(
          '{{lockUntil}}',
          lockUntil.toString(),
        );

        throw new AppError(lockErrorMessage, HTTP_STATUS_CODES.UNAUTHORIZED_401);
      }
    }
  }

  private async resetUserLoginAttempts(email: string): Promise<void> {
    await this.user.updateOne(
      { email },
      {
        $set: {
          failedLoginAttempts: 0,
          lockUntil: null,
        },
      },
    );
  }

  private async updateUserData(email: string, data: object): Promise<void> {
    await this.user.updateOne(
      { email },
      {
        $set: data,
      },
    );
  }

  private async increaseUserLoginAttempts(email: string, newFailedLoginAttempts: number): Promise<void> {
    await this.updateUserData(email, { failedLoginAttempts: newFailedLoginAttempts });
  }

  private async lockUserUntil(email: string, lockUntil: Date): Promise<void> {
    await this.updateUserData(email, { failedLoginAttempts: 0, lockUntil });
  }

  private async validatePassword(user: UserDocument, password: string): Promise<void> {
    const { email } = user;

    if (!(await user.isValidPassword(password))) {
      const { failedLoginAttempts } = user;
      const oneAttempt = 1;
      const newFailedLoginAttempts = failedLoginAttempts + oneAttempt;
      const { maxLoginAttempts, lockTimeMs } = config.auth;

      if (newFailedLoginAttempts >= maxLoginAttempts) {
        const newLockUntil = new Date(Date.now() + lockTimeMs);

        await this.lockUserUntil(email, newLockUntil);

        const lockErrorMessage = ERROR_MESSAGES.lockedTooManyFailedLoginAttempts.replace(
          '{{lockUntil}}',
          newLockUntil.toString(),
        );

        throw new AppError(lockErrorMessage, HTTP_STATUS_CODES.UNAUTHORIZED_401);
      } else {
        await this.increaseUserLoginAttempts(email, newFailedLoginAttempts);

        throw new AppError(ERROR_MESSAGES.invalidCredentials, HTTP_STATUS_CODES.UNAUTHORIZED_401);
      }
    }

    await this.resetUserLoginAttempts(email);
  }

  private async findUserByEmail(email: string): Promise<UserDocument | null> {
    return this.user.findOne({ email }).select('+password +failedLoginAttempts +lockUntil');
  }
}
