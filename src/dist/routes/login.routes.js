"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loginController_1 = __importDefault(require("../MSC/controllers/loginController"));
const userMid_1 = __importDefault(require("../MSC/middlewares/userMid"));
const router = express_1.default.Router();
const userController = new loginController_1.default();
router
    .post('/', userMid_1.default.validEmail, userMid_1.default.validPassword, userController.getLogin);
exports.default = router;
