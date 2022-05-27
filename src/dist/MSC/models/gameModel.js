"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class GameModel {
    constructor(connection) {
        this.connection = connection;
    }
    /* Na método create:
      recebemos como parâmetro informações do jogador e o resultado do jogo
      precisamos do id do jogador para poder inserí-lo na tabela Users_Games
      junto com o id do jogo, ou seja. eu os apelidei para ser mais fácil:
      userId e game_id
    */
    create(userId, game) {
        return __awaiter(this, void 0, void 0, function* () {
            const { successes, mistakes, result } = game;
            const queryGame = 'INSERT INTO Games (successes, mistakes, result) VALUES (?, ?, ?)';
            const queryUsers_Games = 'INSERT INTO Users_Games (user_id, game_id) VALUES (?, ?)';
            const newGame = yield this.connection.execute(queryGame, [successes, mistakes, result]);
            const [dataInserted] = newGame;
            const { insertId: game_id } = dataInserted;
            yield this.connection.execute(queryUsers_Games, [userId, game_id]);
            return Object.assign({ id: game_id }, game);
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.connection
                .execute('SELECT id, nickname, email FROM Users WHERE id = ?;', [userId]);
            const [rows] = result;
            return rows;
        });
    }
    getAll(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const [game_ids] = yield this.connection
                .execute('SELECT * FROM Users_Games WHERE user_id = ?;', [userId]);
            const type_game_ids = game_ids;
            return type_game_ids;
        });
    }
    getAllById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const [game_ids] = yield this.connection
                .execute('SELECT game_id FROM Users_Games WHERE user_id = ?;', [userId]); // Busca os ids dos jogos relacionados ao id do usuário.
            const type_game_ids = game_ids; // "Tipa" o retorno da query como um array da interface IUsers_Games ou um array vazio.
            const arrayGameIds = type_game_ids.map((idGame) => idGame.game_id); // faz um map para guardar os ids dos jogos dentro de um array de números.
            const [allGames] = yield this.connection
                .execute(`SELECT * FROM QUIZ_GAME_API.Games WHERE id IN(${arrayGameIds});`); // Seleciona todos os jogos que tenham ids iguais aos números dentro do arrayGameIds.
            const allGamesById = allGames; // "Tipa" o retorno de  allGames como Array da interface IGame, ou um array vazio (caso não tenha jogos do usuário).
            return allGamesById;
        });
    }
}
exports.default = GameModel;
