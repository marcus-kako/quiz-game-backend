"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BAD_REQ = 400;
const ValidDName = (req, res, next) => {
    const { displayName } = req.body;
    if (displayName.length < 8) {
        return res.status(BAD_REQ)
            .json({ message: '"displayName" length must be at least 8 characters long' });
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
    if (!password || password === '') {
        return res.status(BAD_REQ)
            .json({ message: '"password" is required' });
    }
    if (password.length < SIX) {
        return res.status(BAD_REQ)
            .json({ message: '"password" length must be 6 characters long' });
    }
    next();
};
exports.default = {
    ValidDName,
    validEmail,
    validPassword,
};
