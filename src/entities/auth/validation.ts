import Joi from 'joi';
import { USER_ROLES } from '../../config/constants';
import { config } from '../../config/config';

const minPasswordLength = config.password.minLength;

const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const userRegisterSchema = Joi.object({
  email: Joi.string().email().required(),
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  password: Joi.string().min(minPasswordLength).required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Passwords do not match',
  }),
  role: Joi.string()
    .valid(...Object.values(USER_ROLES))
    .required(),
});

export { userLoginSchema, userRegisterSchema };
