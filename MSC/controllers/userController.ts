import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserService from '../services/userService';

class UserController {
  constructor(private userService = new UserService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const users = await this.userService.getAll();
    res.status(StatusCodes.OK).json(users);
  };

  public getById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    const [user] = await this.userService.getById(id);
    return res.status(StatusCodes.OK).json(user);
  }

  public create = async (req: Request, res: Response) => {
    try {
      const createdUser = await this.userService.create(req.body);
    return res.status(StatusCodes.CREATED).json(createdUser);
    } catch (e) {
      console.log(e);
    }
  }
}

export default UserController;
