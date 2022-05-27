import connection from '../models/connection';
import GameModel from '../models/gameModel';
import IGame from "../../interfaces/IGame";
import IQuest from '../../interfaces/IQuest';

const axios = require('axios');

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

  public async generate(amount: number, category: number, difficulty: string, type: string): Promise<IQuest[]> {
    let urbBase = `https://opentdb.com/api.php?`
    let url = `amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`
    let questions: IQuest[] = []
    await axios.get(`${urbBase + url}`)
    .then((res: any) => { questions = res.data.results })
    .catch((err: any) => { throw new Error('Error calling external API') })
    return questions as IQuest[]
  }
}

export default GameService;