import { Request, Response } from 'express';
import LoginService from '../services/LoginService';

class LoginController {
  public service: LoginService;

  constructor() {
    this.service = new LoginService();
  }

  public checkUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const token = await this.service.checkUser(email, password);
    return res.status(200).json({ token });
  };

  public checkCredentials = async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    const role = await this.service.checkingToken(token);
    return res.status(200).json({ role });
  };
}

export default new LoginController();
