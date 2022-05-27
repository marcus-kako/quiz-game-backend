"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const BAD_REQ = 400;
const ValidId = (req, res, next) => {
    const userId = req.params.id;
    if (!userId || userId === '') {
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ message: '"id" is required' });
    }
    if (Number(userId) < 1) {
        return res.status(BAD_REQ)
            .json({ message: '"id" must be a number greater than 0' });
    }
    next();
};
const validBody = (req, res, next) => {
    const { successes, mistakes, result, userId } = req.body;
    if (!successes || successes === '') {
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ message: '"successes" is required' });
    }
    if (!mistakes || mistakes === '') {
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ message: '"mistakes" is required' });
    }
    if (typeof result !== 'boolean' || result === undefined) {
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ message: '"result" is mandatory, and must be a boolean value' });
    }
    if (!userId || userId === '') {
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ message: '"userId" is required' });
    }
    next();
};
const ValidGenerateGameBody = (req, res, next) => {
    const { amount, category, difficulty, type } = req.body;
    if (!amount || amount === '') {
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ message: 'amount is required' });
    }
    if (!category || category === '') {
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ message: 'category is required' });
    }
    if (!difficulty || difficulty === '') {
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ message: 'difficulty is required' });
    }
    if (!type || type === '') {
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ message: 'type is required' });
    }
    next();
};
exports.default = {
    ValidId,
    validBody,
    ValidGenerateGameBody
};
