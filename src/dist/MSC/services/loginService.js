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
const loginModel_1 = __importDefault(require("../models/loginModel"));
class UserService {
    constructor() {
        this.model = new loginModel_1.default(connection_1.default);
    }
    getLogin(login) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = login;
            const validLogin = yield this.model.getByEmail(email);
            if (validLogin.length === 0 || validLogin[0].password !== password) {
                throw new Error(`Invalid email or password`);
            }
            return validLogin[0];
        });
    }
}
exports.default = UserService;
