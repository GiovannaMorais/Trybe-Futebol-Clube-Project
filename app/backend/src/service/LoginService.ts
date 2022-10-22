import bcrypt = require('bcryptjs');
// import validateToken from 'src/utils/validateToken';
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
    // console.log(' ...userFound ', { ...userFound });
    return { status: null, message: token };
  };

  public validate = async (token:string) => {
    // console.log("tokemos", token);
    const data = validateToken(token);
    console.log('data', data);
    // console.log('user', user);
    // const decode = await Users.findByPk(data.payload.role, { attributes: ['role'] });
    // console.log('decode', decode);
    return data.role;
  };
}
export default LoginService;
