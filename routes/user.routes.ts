import express from 'express';
import UserController from '../MSC/controllers/userController';
// import UserValidate from '../middleware/userValidate';

const router = express.Router();

const userController = new UserController();

router
  .get('/', userController.getAll)
  .get('/:id', userController.getById)
  .post('/',  userController.create);

export default router;