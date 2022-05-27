import express from 'express';
import GameController from '../MSC/controllers/gameController';
import GameMid from "../MSC/middlewares/gameMid";

const router = express.Router();

const gameController = new GameController();

router
.post('/', GameMid.validBody, gameController.create)
.get('/:id', GameMid.ValidId, gameController.getAllById) // O id no parâmetro é o do usuário e não do jogo.
.post('/quests/generate', GameMid.ValidGenerateGameBody, gameController.generate);

export default router;