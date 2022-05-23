import express from 'express';
import GameController from '../MSC/controllers/gameController';

const router = express.Router();

const gameController = new GameController();

router
.post('/', gameController.create)
.get('/:id', gameController.getAllById); // O id no parâmetro é o do usuário e não do jogo.

export default router;