import express from 'express';
import LoginController from '../MSC/controllers/loginController';
import userMid from '../MSC/middlewares/userMid';

const router = express.Router();

const userController = new LoginController();

router
  .post('/', userMid.validEmail, userMid.validPassword, userController.getLogin);

export default router;