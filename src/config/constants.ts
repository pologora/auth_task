import { config } from './config';

export const HTTP_STATUS_CODES = {
  BAD_REQUEST_400: 400,
  CREATED_201: 201,
  FORBIDDEN_403: 403,
  INTERNAL_SERVER_ERROR_500: 500,
  NO_CONTENT_204: 204,
  NOT_FOUND_404: 404,
  SUCCESS_200: 200,
  TOO_MANY_REQUESTS_429: 429,
  UNAUTHORIZED_401: 401,
} as const;

export const USER_ROLES = {
  admin: 'admin',
  user: 'user',
} as const;

export const APP_MODES = {
  production: 'production',
  development: 'development',
} as const;

export const ENTITIES_NAMES = {
  user: 'User',
} as const;

export const ERROR_MESSAGES = {
  invalidCredentials: `Invalid credentials. You have ${config.auth.maxLoginAttempts} attempts until your account will be temporarily blocked.`,
  lockedTooManyFailedLoginAttempts: `Your account has been locked due to too many failed login attempts. Try again at {{lockUntil}}`,
  userNotFound: 'User not found',
  defaultUserFriendly: 'Something went wrong, please try again later',
};

export const millisecondsInSecond = 1000;
export const secondsInMinute = 60;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];
export type StatusCode = (typeof HTTP_STATUS_CODES)[keyof typeof HTTP_STATUS_CODES];
