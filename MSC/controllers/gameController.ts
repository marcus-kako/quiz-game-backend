import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import IGame from "../../interfaces/IGame";
import GameService from '../services/gameService';

class GameController {
  constructor(private gameService = new GameService()) { }

  public create = async (req: Request, res: Response) => {
    const { idUser, successes, mistakes, result } = req.body;
    const game: IGame = { successes, mistakes, result };
    const createdGame = await this.gameService.create(idUser, game);
    return res.status(StatusCodes.CREATED).json(createdGame);
  }
}

export default GameController;
