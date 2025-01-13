import { Model } from 'mongoose';
import { CreateUserProps, IUser } from './types/types';

import { BaseService } from '../../core/BaseService';

export class UserService extends BaseService<IUser> {
  constructor(private user: Model<IUser>) {
    super(user);
  }

  async create({ data }: CreateUserProps): Promise<IUser> {
    const user = new this.user(data);
    await user.setPassword(data.password);

    await user.save();

    return (await this.findOneById({ id: String(user._id) })) as IUser;
  }
}
