"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BAD_REQ = 400;
const ValidDName = (req, res, next) => {
    const { nickname } = req.body;
    if (nickname === undefined || nickname === '') {
        return res.status(BAD_REQ)
            .json({ message: '"nickname" is required' });
    }
    if (nickname.length < 2) {
        return res.status(BAD_REQ)
            .json({ message: '"nickname" length must be at least 2 characters long' });
    }
    next();
};
const validEmail = (req, res, next) => {
    const { email } = req.body;
    if (!email || email === '') {
        return res.status(BAD_REQ)
            .json({ message: '"email" is required' });
    }
    const emailValidation = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const ifEmail = emailValidation.test(email);
    if (!ifEmail) {
        return res.status(BAD_REQ)
            .json({ message: '"email" must be a valid email' });
    }
    next();
};
const validPassword = (req, res, next) => {
    const { password } = req.body;
    const SIX = 6;
    const FIFTEEN = 15;
    if (!password || password === '') {
        return res.status(BAD_REQ)
            .json({ message: '"password" is required' });
    }
    if (password.length < SIX || password.length > FIFTEEN) {
        return res.status(BAD_REQ)
            .json({ message: '"password" must be 6 to 15 characters long' });
    }
    next();
};
exports.default = {
    ValidDName,
    validEmail,
    validPassword,
};
