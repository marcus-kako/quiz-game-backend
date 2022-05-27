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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const gameService_1 = __importDefault(require("../services/gameService"));
class GameController {
    constructor(gameService = new gameService_1.default()) {
        this.gameService = gameService;
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { userId, successes, mistakes, result } = req.body;
            try {
                const game = { successes, mistakes, result };
                const createdGame = yield this.gameService.create(userId, game);
                return res.status(http_status_codes_1.StatusCodes.CREATED).json(createdGame);
            }
            catch (error) {
                if (error instanceof Error && error.message.includes('user not found')) {
                    res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: error.message });
                }
            }
        });
        this.getAllById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const allGamesUser = yield this.gameService.getAllById(Number(userId));
                return res.status(http_status_codes_1.StatusCodes.OK).json(allGamesUser);
            }
            catch (error) {
                if (error instanceof Error && error.message.includes('User has no game history')) {
                    return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: error.message });
                }
            }
        });
        this.generate = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { amount, category, difficulty, type } = req.body;
            try {
                const questions = yield this.gameService.generate(amount, category, difficulty, type);
                console.log(questions);
                return res.status(http_status_codes_1.StatusCodes.CREATED).json(questions);
            }
            catch (error) {
                res.status(http_status_codes_1.StatusCodes.CONFLICT).json({ message: error });
            }
        });
    }
}
exports.default = GameController;
