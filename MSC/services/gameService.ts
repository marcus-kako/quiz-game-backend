import connection from '../models/connection';
import GameModel from '../models/gameModel';
import IGame from "../../interfaces/IGame";

class GameService {
  public model: GameModel;

  constructor() {
    this.model = new GameModel(connection);
  }

  public async create(userId: number, game: IGame): Promise<IGame | void> {
      const createdGame = await this.model.create(userId, game);
      return createdGame;
    }

    public async getAllById(userId: number): Promise<IGame[] | []> {
      const allGamesUser = await this.model.getAllById(userId);
      return allGamesUser;
    }
  }

export default GameService;