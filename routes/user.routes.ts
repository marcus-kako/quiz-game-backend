import express from 'express';
import UserController from '../MSC/controllers/userController';
import userMid from '../MSC/middlewares/userMid';

const router = express.Router();

const userController = new UserController();

router
  .get('/', userController.getAll)
  .get('/:id', userController.getById)
  .post('/',  userMid.ValidDName, userMid.validEmail, userMid.validPassword, userController.create);

export default router;