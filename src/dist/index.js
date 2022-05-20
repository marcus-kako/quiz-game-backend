"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = require("http-status-codes");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
require("express-async-errors");
require("dotenv/config");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.status(http_status_codes_1.StatusCodes.OK).send('Quiz Game API');
});
app.use('/users', user_routes_1.default);
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
