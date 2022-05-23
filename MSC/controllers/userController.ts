import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserService from '../services/userService';

class UserController {
  constructor(private userService = new UserService()) { }

  public create = async (req: Request, res: Response) => {
    try {
      const createdUser = await this.userService.create(req.body);
    return res.status(StatusCodes.CREATED).json(createdUser);
    } catch (e: unknown) {
      if ( e instanceof Error && e.message.includes('"Email" already registered')) {
        return res.status(StatusCodes.CONFLICT).json({ message: e.message})
      }
      if ( e instanceof Error && e.message.includes('"Nickname" already exists')) {
        return res.status(StatusCodes.CONFLICT).json({ message: e.message})
      }
    }
  }
  
  public getAll = async (_req: Request, res: Response) => {
    const users = await this.userService.getAll();
    res.status(StatusCodes.OK).json(users);
  };

  public getById = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const [user] = await this.userService.getById(id);
      return res.status(StatusCodes.OK).json(user);
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes('user not found')) {
        res.status(StatusCodes.NOT_FOUND).json({ message: error.message})
      }
    }
  }
}

export default UserController;
