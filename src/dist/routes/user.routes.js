"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../MSC/controllers/userController"));
// import UserValidate from '../middleware/userValidate';
const router = express_1.default.Router();
const userController = new userController_1.default();
router
    .get('/', userController.getAll)
    .get('/:id', userController.getById)
    .post('/', userController.create);
exports.default = router;
