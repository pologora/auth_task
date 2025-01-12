import jwt from 'jsonwebtoken';
import { config } from '../config/config';

type CreateJWTProps = {
  userId: string;
};

type ValidateJWTProps = {
  token: string;
};

export interface JWTCreateFunction {
  (props: { userId: string }): Promise<string>;
}

const createJWT = async ({ userId }: CreateJWTProps): Promise<string> => {
  const payload = {
    userId,
  };

  return new Promise((resolve, reject) => {
    jwt.sign(payload, config.jwt.secret!, { expiresIn: config.jwt.expiresIn }, (err, token) => {
      if (err) return reject(err);
      resolve(token!);
    });
  });
};

const validateJWT = async ({ token }: ValidateJWTProps): Promise<{ userId: string }> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.jwt.secret!, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded as { userId: string });
      }
    });
  });
};

export { createJWT, validateJWT };
