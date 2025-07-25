import jwt from 'jsonwebtoken';
import { envs } from './envs';

const JWT_SEED = envs.JWT_SEED;

export class JwtAdapter {
  static async generateToken(payload: Object, durationInHours: number = 2): Promise<string | null> {

    return new Promise((resolve) => {
      jwt.sign(payload, JWT_SEED, {
        expiresIn: `${durationInHours}h`
      }, (error, token) => {

        if (error) return resolve(null);

        return resolve(token!);
      })
    });
  };

  static validateToken<T>(token: string): Promise<T | null> {
    return new Promise((resolve) => {
      jwt.verify(token, JWT_SEED, (error, decoded) => {

        if (error) return resolve(null);

        resolve(decoded as T);
      })
    });
  };
}
