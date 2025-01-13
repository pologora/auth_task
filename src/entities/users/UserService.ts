import { Model } from 'mongoose';
import {
  CreateUserProps,
  DeleteUserProps,
  FindManyProps,
  FindOneByIdProps,
  IUser,
  UpdateUserProps,
} from './types/types';
import { CreateUserDto } from './dto/CreateUserDto';
import { AppError } from '../../core/AppError';
import { ERROR_MESSAGES, HTTP_STATUS_CODES } from '../../config/constants';

export class UserService {
  constructor(private User: Model<CreateUserDto>) {}

  private checkUserExists(user: IUser | null): IUser {
    if (!user) {
      throw new AppError(ERROR_MESSAGES.userNotFound, HTTP_STATUS_CODES.NOT_FOUND_404);
    }

    return user;
  }

  async create({ data }: CreateUserProps): Promise<IUser> {
    const user = new this.User(data);
    await user.setPassword(data.password);

    await user.save();

    return await this.findOneById({ id: String(user._id) });
  }

  async findOneById({ id }: FindOneByIdProps): Promise<IUser> {
    const user = await this.User.findById(id).lean();

    return this.checkUserExists(user);
  }

  async findAll({ queryParams }: FindManyProps): Promise<IUser[]> {
    return await this.User.find(queryParams);
  }

  async update({ id, data }: UpdateUserProps): Promise<IUser> {
    const updatedUser = await this.User.findByIdAndUpdate(id, data, { new: true }).lean();

    return this.checkUserExists(updatedUser);
  }

  async remove({ id }: DeleteUserProps): Promise<IUser> {
    const deletedUser = await this.User.findByIdAndDelete(id).lean();

    return this.checkUserExists(deletedUser);
  }
}
