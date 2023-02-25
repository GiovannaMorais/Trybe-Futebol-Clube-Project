"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isEmailValid = (email) => {
    const regEmail = /^[\w.+]+@\w+.\w{2,}(?:.\w{2})?$/gim;
    const testEmail = regEmail.test(email);
    if (!testEmail)
        return false;
    return true;
};
exports.default = (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ message: 'All fields must be filled' });
        if (!isEmailValid(email)) {
            return res.status(401).json({ message: 'Incorrect email or password' });
        }
        if (password.length < 6) {
            return res.status(422).json({ message: '"password" length must be at least 6 characters long' });
        }
        next();
    }
    catch (err) {
        next(err);
    }
};
