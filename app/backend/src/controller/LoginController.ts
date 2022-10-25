import { Request, Response } from 'express';
import LoginService from '../service/LoginService';

class LoginController {
  constructor(private loginService = new LoginService()) {}

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const login = await this.loginService.login({ email, password });
    if (login?.status) {
      return res.status(login?.status).json({ message: login?.message });
    }
    return res.status(200).json({ token: login?.message });
  };

  public validate = async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    const user = await this.loginService.validate(token as string);
    return res.status(200).json({ role: user });
  };
}
export default LoginController;
