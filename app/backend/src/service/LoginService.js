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
const bcrypt = require("bcryptjs");
const users_1 = __importDefault(require("../database/models/users"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const validateToken_1 = __importDefault(require("../utils/validateToken"));
class LoginService {
    constructor() {
        this.login = (login) => __awaiter(this, void 0, void 0, function* () {
            const { password, email } = login;
            const userFound = yield users_1.default.findOne({ where: { email } });
            if (!userFound) {
                return { status: 401, message: 'Incorrect email or password' };
            }
            const result = yield bcrypt.compare(password, userFound === null || userFound === void 0 ? void 0 : userFound.password);
            if (!result) {
                return { status: 401, message: 'Incorrect email or password' };
            }
            const { id, username, role } = userFound;
            const token = (0, generateToken_1.default)({ id, username, role });
            return { status: null, message: token };
        });
        this.validate = (token) => __awaiter(this, void 0, void 0, function* () {
            const data = (0, validateToken_1.default)(token);
            return data.role;
        });
    }
}
exports.default = LoginService;
