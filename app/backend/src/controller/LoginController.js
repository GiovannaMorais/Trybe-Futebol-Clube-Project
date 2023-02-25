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
const LoginService_1 = __importDefault(require("../service/LoginService"));
class LoginController {
    constructor(loginService = new LoginService_1.default()) {
        this.loginService = loginService;
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const login = yield this.loginService.login({ email, password });
            if (login === null || login === void 0 ? void 0 : login.status) {
                return res.status(login === null || login === void 0 ? void 0 : login.status).json({ message: login === null || login === void 0 ? void 0 : login.message });
            }
            return res.status(200).json({ token: login === null || login === void 0 ? void 0 : login.message });
        });
        this.validate = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization;
            const user = yield this.loginService.validate(token);
            return res.status(200).json({ role: user });
        });
    }
}
exports.default = LoginController;
