import connection from '../models/connection';
import GameModel from '../models/gameModel';
import IGame from "../../interfaces/IGame";

class GameService {
  public model: GameModel;

  constructor() {
    this.model = new GameModel(connection);
  }

  public async create(idUser: number, game: IGame): Promise<IGame | void> {
      const createdGame = await this.model.create(idUser, game);
      return createdGame;
    }
  }

export default GameService;