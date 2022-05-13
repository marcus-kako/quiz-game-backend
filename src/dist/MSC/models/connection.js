"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
require("dotenv/config");
const { DB_HOST, DB_PASSWORD, DATABASE, DB_USER, } = process.env;
exports.default = promise_1.default.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DATABASE,
});
