import * as jwt from 'jsonwebtoken';
import 'dotenv';
import { UserPayload } from '../interfaces/user';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

const generateToken = (payload: UserPayload): string => {
  const token = jwt.sign({ payload }, JWT_SECRET, { algorithm: 'HS256', expiresIn: '1d' });
  return token;
};

export default generateToken;
