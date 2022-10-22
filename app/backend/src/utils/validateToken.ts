import * as jwt from 'jsonwebtoken';
import 'dotenv';
import { UserPayload } from '../interfaces/user';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

const validateToken = (token: string) => {
  const verifyToken = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
  console.log('verifyToken', verifyToken);
  return (verifyToken.payload);
};

export default validateToken;
