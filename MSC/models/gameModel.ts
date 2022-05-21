import { Pool, ResultSetHeader } from 'mysql2/promise';
import IGame from '../../interfaces/IGame';
import IUser from "../../interfaces/IUser";
// import IUsers_Games from '../../interfaces/IUsers_Games';

export default class GameModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  /* Na método create: 
    recebemos como parâmetro informações do jogador e o resultado do jogo
    precisamos do id do jogador para poder inserí-lo na tabela Users_Games 
    junto com o id do jogo, ou seja. eu os apelidei para ser mais fácil:
    user_id e game_id
  */
  public async create(idUser: number, game: IGame): Promise<IGame> {
    const { successes, mistakes, result } = game;
    const resultQ = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Games (successes, mistakes, result) VALUES (?, ?, ?)',
      [successes, mistakes, result],
    );
    const [dataInserted] = resultQ;
    const { insertId: game_id } = dataInserted;

    await this.connection.execute(
      `INSERT INTO Users_Games (user_id, game_id) VALUES (?, ?)`,
      [idUser, game_id]
    )

    return {
      id: game_id,
      ...game,
    }
  }

  // public async getAll(): Promise<IGame[]> {
  //   const result = await this.connection
  //     .execute('SELECT * FROM Games;');
  //   const [rows] = result;
  //   return rows as IGame[];
  // }

  // public async getById(id: number): Promise<IGame[] | []> {
  //   const result = await this.connection
  //     .execute('SELECT * FROM Games WHERE id = ?;', [id]);
  //   const [rows] = result;
  //   return rows as IGame[];
  // }
}
