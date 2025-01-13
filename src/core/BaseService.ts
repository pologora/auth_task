import { Model } from 'mongoose';
import { ERROR_MESSAGES, HTTP_STATUS_CODES } from '../config/constants';
import { AppError } from './AppError';

export type createProps = { data: object };
export type FindOneByIdProps = { id: string };
export type FindManyProps = { queryParams: object };
export type UpdateUserProps = { data: object; id: string };
export type DeleteUserProps = { id: string };

export class BaseService<T> {
  constructor(private model: Model<T>) {}

  private checkRecordExists(record: T | null): T {
    if (!record) {
      throw new AppError(ERROR_MESSAGES.userNotFound, HTTP_STATUS_CODES.NOT_FOUND_404);
    }

    return record;
  }

  async create({ data }: createProps): Promise<T> {
    const record = new this.model(data);

    await record.save();

    return (await this.findOneById({ id: String(record._id) })) as T;
  }

  async findOneById({ id }: FindOneByIdProps): Promise<T> {
    const record = (await this.model.findById(id)) as T;

    return this.checkRecordExists(record);
  }

  async findAll({ queryParams }: FindManyProps): Promise<T[]> {
    return await this.model.find(queryParams);
  }

  async update({ id, data }: UpdateUserProps): Promise<T> {
    const updatedUser = (await this.model.findByIdAndUpdate(id, data, { new: true })) as T;

    return this.checkRecordExists(updatedUser) as T;
  }

  async remove({ id }: DeleteUserProps): Promise<T> {
    const deletedUser = (await this.model.findByIdAndDelete(id)) as T;

    return this.checkRecordExists(deletedUser);
  }
}
