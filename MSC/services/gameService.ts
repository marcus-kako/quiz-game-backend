import connection from '../models/connection';
import GameModel from '../models/gameModel';
import IGame from "../../interfaces/IGame";

class GameService {
  public model: GameModel;

  constructor() {
    this.model = new GameModel(connection);
    
  }

  public async create(userId: number, game: IGame): Promise<IGame | void> {
  const ifIdExists = await this.model.getUserById(userId);
  if (ifIdExists.length === 0) {
    throw new Error('user not found')
  }
  const createdGame = await this.model.create(userId, game);
  console.log(createdGame);
  return createdGame;
  }

  public async getAllById(userId: number): Promise<IGame[] | []> {
    const ifGameExists = await this.model.getAll(userId);
    if (ifGameExists.length === 0) {
      throw new Error('User has no game history')
    };
    const allGamesUser = await this.model.getAllById(userId);
    return allGamesUser;
  }
}

export default GameService;