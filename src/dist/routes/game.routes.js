"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const gameController_1 = __importDefault(require("../MSC/controllers/gameController"));
const gameMid_1 = __importDefault(require("../MSC/middlewares/gameMid"));
const router = express_1.default.Router();
const gameController = new gameController_1.default();
router
    .post('/', gameMid_1.default.validBody, gameController.create)
    .get('/:id', gameMid_1.default.ValidId, gameController.getAllById) // O id no parâmetro é o do usuário e não do jogo.
    .post('/quests/generate', gameMid_1.default.ValidGenerateGameBody, gameController.generate);
exports.default = router;
