import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import HttpException from '../utils/HttpException';
import User from '../database/models/User';
import IPayload from '../interfaces/IPayload';

const secret = process.env.JWT_SECRET || 'temporarySecret';

class LoginService {
  public checkUser = async (email: string, password: string) => {
    const anyUser = await User.findOne({ where: { email } });
    if (!anyUser) throw new HttpException(401, 'Incorrect email or password');
    if (bcrypt.compareSync(password, anyUser.password)) {
      const generatedToken = jwt.sign({ email, role: anyUser.role }, secret);
      return generatedToken;
    }
    throw new HttpException(401, 'Incorrect email or password');
  };

  public verifyPayload = async (token: string) => {
    try {
      const payload = jwt.verify(token, secret) as IPayload;
      return payload.role;
    } catch (err) {
      throw new HttpException(401, 'INVALID TOKEN');
    }
  };

  public checkingToken = async (token: string | undefined) => {
    if (!token) throw new HttpException(401, 'INVALID');
    const role = await this.verifyPayload(token);
    return role;
  };
}

export default LoginService;
