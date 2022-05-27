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
const connection_1 = __importDefault(require("../models/connection"));
const gameModel_1 = __importDefault(require("../models/gameModel"));
const axios = require('axios');
class GameService {
    constructor() {
        this.model = new gameModel_1.default(connection_1.default);
    }
    create(userId, game) {
        return __awaiter(this, void 0, void 0, function* () {
            const ifIdExists = yield this.model.getUserById(userId);
            if (ifIdExists.length === 0) {
                throw new Error('user not found');
            }
            const createdGame = yield this.model.create(userId, game);
            return createdGame;
        });
    }
    getAllById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const ifGameExists = yield this.model.getAll(userId);
            if (ifGameExists.length === 0) {
                throw new Error('User has no game history');
            }
            ;
            const allGamesUser = yield this.model.getAllById(userId);
            return allGamesUser;
        });
    }
    generate(amount, category, difficulty, type) {
        return __awaiter(this, void 0, void 0, function* () {
            let urbBase = `https://opentdb.com/api.php?`;
            let url = `amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;
            let questions = [];
            yield axios.get(`${urbBase + url}`)
                .then((res) => { questions = res.data.results; })
                .catch((err) => { throw new Error('Error calling external API'); });
            return questions;
        });
    }
}
exports.default = GameService;
