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
const loginService_1 = __importDefault(require("../services/loginService"));
class UserController {
    constructor(loginService = new loginService_1.default()) {
        this.loginService = loginService;
        this.getLogin = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const login = { email: req.body.email, password: req.body.password };
                const userInfo = yield this.loginService.getLogin(login);
                delete userInfo['password'];
                return res.status(http_status_codes_1.StatusCodes.OK).json(userInfo);
            }
            catch (error) {
                if (error instanceof Error && error.message.includes('Invalid email or password')) {
                    return res.status(http_status_codes_1.StatusCodes.CONFLICT).json({ message: error.message });
                }
            }
        });
    }
}
exports.default = UserController;
