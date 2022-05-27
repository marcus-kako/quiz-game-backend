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
const userModel_1 = __importDefault(require("../models/userModel"));
class UserService {
    constructor() {
        this.model = new userModel_1.default(connection_1.default);
    }
    isValidEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const allUsers = yield this.getAll();
            const isValid = allUsers
                .filter((u) => u.email === email);
            return isValid.length === 0;
        });
    }
    isValiddisplayName(displayName) {
        return __awaiter(this, void 0, void 0, function* () {
            const allUsers = yield this.getAll();
            const isValid = allUsers
                .filter((u) => u.nickname === displayName);
            return isValid.length === 0;
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const vaEmail = yield this.isValidEmail(user.email);
            const vaDisplayName = yield this.isValiddisplayName(user.nickname);
            if (!vaEmail) {
                throw new Error('"Email" already registered');
            }
            else if (!vaDisplayName) {
                throw new Error('"Nickname" already exists');
            }
            else {
                const createdUser = yield this.model.create(user);
                return createdUser;
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.model.getAll();
            return users;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.model.getById(id);
            if (users.length === 0) {
                throw new Error('user not found');
            }
            return users;
        });
    }
}
exports.default = UserService;
