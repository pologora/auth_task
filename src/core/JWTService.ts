import jwt from 'jsonwebtoken';
import { config } from '../config/config';

type CreateJWTProps = {
  userId: string;
};

type ValidateJWTProps = {
  token: string;
};

export class JWTService {
  private secret: string;
  private expireIn: string;

  constructor() {
    this.secret = config.jwt.secret!;
    this.expireIn = config.jwt.expireIn;
  }

  async createJWT({ userId }: CreateJWTProps): Promise<string> {
    const payload = {
      userId,
    };

    return new Promise((resolve, reject) => {
      jwt.sign(payload, this.secret, { expiresIn: this.expireIn }, (err, token) => {
        if (err) return reject(err);
        resolve(token!);
      });
    });
  }

  async validateJWT({ token }: ValidateJWTProps): Promise<{ userId: string } | null> {
    return new Promise((resolve) => {
      jwt.verify(token, this.secret, (err, decoded) => {
        if (err) {
          resolve(null);
        } else {
          resolve(decoded as { userId: string });
        }
      });
    });
  }
}
