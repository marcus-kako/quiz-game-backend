import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import LoginService from '../services/loginService';

class UserController {
  constructor(private loginService = new LoginService()) { }

  public getLogin = async (req: Request, res: Response) => {
    try {
      const login = { email: req.body.email, password: req.body.password}
      await this.loginService.getLogin(login);
      return res.status(StatusCodes.OK).json({ status: 'login successfully'});
    } catch (error) {
      if (error instanceof Error && error.message.includes('Invalid email or password')) {
        return res.status(StatusCodes.CONFLICT).json({ message: error.message})
      }
    }
  }
}

export default UserController;
