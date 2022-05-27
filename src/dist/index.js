"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = require("http-status-codes");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const login_routes_1 = __importDefault(require("./routes/login.routes"));
const game_routes_1 = __importDefault(require("./routes/game.routes"));
require("express-async-errors");
require("dotenv/config");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.status(http_status_codes_1.StatusCodes.OK).send('Quiz Game API');
});
app.use('/users', user_routes_1.default);
app.use('/login', login_routes_1.default);
app.use('/games', game_routes_1.default);
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
