import express from 'express';
import GameController from '../MSC/controllers/gameController';

const router = express.Router();

const gameController = new GameController();

router
  // .get('/', userController.getAll)
  // .get('/:id', userController.getById)
  .post('/', gameController.create);

export default router;