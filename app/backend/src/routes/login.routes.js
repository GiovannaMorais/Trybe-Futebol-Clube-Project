"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LoginController_1 = __importDefault(require("../controller/LoginController"));
const LoginMiddleware_1 = __importDefault(require("../middlewares/LoginMiddleware"));
const loginController = new LoginController_1.default();
const router = (0, express_1.Router)();
router.post('/login', LoginMiddleware_1.default, loginController.login);
router.get('/login/validate', loginController.validate);
exports.default = router;
