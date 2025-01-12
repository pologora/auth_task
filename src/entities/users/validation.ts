import Joi from 'joi';
import { config } from '../../config/config';
import { USER_ROLES } from '../../config/constants';

const minPasswordLength = config.password.minLength;

const userCreateSchema = Joi.object({
  email: Joi.string().email().required(),
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  password: Joi.string().min(minPasswordLength).required(),
  role: Joi.string()
    .valid(...Object.values(USER_ROLES))
    .required(),
});

const userUpdateSchema = Joi.object({
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  role: Joi.string()
    .valid(...Object.values(USER_ROLES))
    .optional(),
});

export { userCreateSchema, userUpdateSchema };
