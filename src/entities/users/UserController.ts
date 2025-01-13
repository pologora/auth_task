import { BaseController } from '../../core/BaseController';
import { UserService } from './UserService';
import { Schema } from 'joi';
import { IUser } from './types/types';
import { ENTITIES_NAMES } from '../../config/constants';

export class UserController extends BaseController<IUser> {
  constructor(userService: UserService, userCreateSchema: Schema, userUpdateSchema: Schema, userParamsSchema: Schema) {
    super(userService, userCreateSchema, userUpdateSchema, userParamsSchema, ENTITIES_NAMES.user);
  }
}
