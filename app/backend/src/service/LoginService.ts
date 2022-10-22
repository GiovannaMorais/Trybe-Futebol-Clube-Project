import bcrypt = require('bcryptjs');
import { Login, ReturnLogin, TokenLogin } from '../interfaces/login';
import Users from '../database/models/users';
import generateToken from '../utils/generateToken';
import validateToken from '../utils/validateToken';

class LoginService {
  public login = async (login: Login): Promise<ReturnLogin | TokenLogin> => {
    const { password, email } = login;

    const userFound = await Users.findOne({ where: { email } });
    console.log('userFound', userFound);

    if (!userFound) {
      return { status: 401, message: 'Incorrect email or password' };
    }

    const result = await bcrypt.compare(password, userFound?.password);

    if (!result) {
      return { status: 401, message: 'Incorrect email or password' };
    }

    const { id, username, role } = userFound;
    const token = generateToken({ id, username, role });
    return { status: null, message: token };
  };

  public validate = async (token:string) => {
    const data = validateToken(token);
    return data.role;
  };
}
export default LoginService;
