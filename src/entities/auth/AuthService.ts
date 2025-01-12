import { Model } from 'mongoose';
import { CreateUserDto } from '../users/dto/CreateUserDto';
import { IUser } from '../users/types/types';
import { UserService } from '../users/UserService';
import { AppError } from '../../core/AppError';
import { HTTP_STATUS_CODES } from '../../config/constants';
import { JWTCreateFunction } from '../../utils/jwtFunction';

type RegisterProps = {
  data: CreateUserDto;
};

type LoginProps = {
  email: string;
  password: string;
};

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
    const user = await this.user.findOne({ email }).select('+password');

    if (!user || !(await user.isValidPassword(password))) {
      throw new AppError('Invalid credentials.', HTTP_STATUS_CODES.UNAUTHORIZED_401);
    }

    const token = await this.createJWT({ userId: user._id.toString() });

    const userForResponse = { ...user.toObject(), password: undefined } as Partial<IUser>;

    return { user: userForResponse, token };
  }
}
