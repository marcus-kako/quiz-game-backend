import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import IGame from "../../interfaces/IGame";
import GameService from '../services/gameService';

class GameController {
  constructor(private gameService = new GameService()) { }

  public create = async (req: Request, res: Response) => {
    const { userId, successes, mistakes, result } = req.body;
    try {
      const game: IGame = { successes, mistakes, result };
      const createdGame = await this.gameService.create(userId, game);
      return res.status(StatusCodes.CREATED).json(createdGame);
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes('user not found')) {
        res.status(StatusCodes.NOT_FOUND).json({ message: error.message})
      }
    }
   
  }

  public getAllById = async (req: Request, res: Response) => {
    try {
      const userId = req.params.id;
      const allGamesUser = await this.gameService.getAllById(Number(userId));
      return res.status(StatusCodes.OK).json(allGamesUser);
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes('User has no game history')) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: error.message});
      }
    }
  }
}

export default GameController;
