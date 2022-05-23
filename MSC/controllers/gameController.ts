import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import IGame from "../../interfaces/IGame";
import GameService from '../services/gameService';

class GameController {
  constructor(private gameService = new GameService()) { }

  public create = async (req: Request, res: Response) => {
    const { userId, successes, mistakes, result } = req.body;
    const game: IGame = { successes, mistakes, result };
    const createdGame = await this.gameService.create(userId, game);
    return res.status(StatusCodes.CREATED).json(createdGame);
  }

  public getAllById = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const allGamesUser = await this.gameService.getAllById(Number(userId));
    return res.status(StatusCodes.OK).json(allGamesUser);
  }
}

export default GameController;
