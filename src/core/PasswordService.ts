import bcrypt from 'bcryptjs';
import { config } from '../config/config';

type ComparePasswordProps = {
  password: string;
  hashedPassword: string;
};

type HashPasswordProps = {
  password: string;
};

export class PasswordService {
  private static readonly saltRounds = config.password.saltRounds;

  static async hashPassword({ password }: HashPasswordProps): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }

  static async comparePassword({ password, hashedPassword }: ComparePasswordProps): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
