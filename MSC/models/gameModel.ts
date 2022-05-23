import { Pool, ResultSetHeader } from 'mysql2/promise';
import IGame from '../../interfaces/IGame';
import IUsers_Games from "../../interfaces/IUsers_Games";

export default class GameModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  /* Na método create: 
    recebemos como parâmetro informações do jogador e o resultado do jogo
    precisamos do id do jogador para poder inserí-lo na tabela Users_Games 
    junto com o id do jogo, ou seja. eu os apelidei para ser mais fácil:
    userId e game_id
  */
  public async create(userId: number, game: IGame): Promise<IGame> {
    const { successes, mistakes, result } = game;
    const queryGame = 'INSERT INTO Games (successes, mistakes, result) VALUES (?, ?, ?)';
    const queryUsers_Games = 'INSERT INTO Users_Games (user_id, game_id) VALUES (?, ?)';
    const newGame = await this.connection.execute<ResultSetHeader>(queryGame, [successes, mistakes, result]);
    const [dataInserted] = newGame;
    const { insertId: game_id } = dataInserted;
    await this.connection.execute(queryUsers_Games,[userId, game_id])
    return {
      id: game_id,
      ...game,
    }
  }
  
    public async getAllById(userId: number): Promise<IGame[] | []> {
      const [game_ids] = await this.connection
        .execute('SELECT game_id FROM Users_Games WHERE user_id = ?;', [userId]); // Busca os ids dos jogos relacionados ao id do usuário.
      const type_game_ids = game_ids as IUsers_Games[] | []; // "Tipa" o retorno da query como um array da interface IUsers_Games ou um array vazio.
      const arrayGameIds: Array<number> = type_game_ids.map((idGame) => idGame.game_id); // faz um map para guardar os ids dos jogos dentro de um array de números.
      const [allGames] = await this.connection
        .execute(`SELECT * FROM QUIZ_GAME_API.Games WHERE id IN(${arrayGameIds});`) // Seleciona todos os jogos que tenham ids iguais aos números dentro do arrayGameIds.
      const allGamesById= allGames as IGame[] | []; // "Tipa" o retorno de  allGames como Array da interface IGame, ou um array vazio (caso não tenha jogos do usuário).
      return allGamesById;
    }
}
