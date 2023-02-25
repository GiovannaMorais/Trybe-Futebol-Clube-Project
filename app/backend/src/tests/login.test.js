"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const jwt = __importStar(require("jsonwebtoken"));
const bcrypt = __importStar(require("bcryptjs"));
const sinon = __importStar(require("sinon"));
const chai = __importStar(require("chai"));
// @ts-ignore
const chaiHttp = require("chai-http");
const app_1 = require("../app");
const users_1 = __importDefault(require("../database/models/users"));
const LoginService_1 = __importDefault(require("../service/LoginService"));
const login_mock_1 = require("./mocks/login.mock");
chai.use(chaiHttp);
const { expect } = chai;
describe('Test on login routes', () => {
    let chaiHttpResponse;
    beforeEach(sinon.restore);
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        sinon
            .stub(users_1.default, "findOne")
            .resolves(login_mock_1.UserPermitted);
    }));
    sinon.stub(jwt, 'sign').resolves(login_mock_1.adminUser);
    sinon.stub(bcrypt, 'compare').resolves(true);
    it('Test login successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield chai.request(app_1.app).post('/login').send(login_mock_1.adminUser);
        expect(response.status).to.be.equal(200);
        expect(response.body).have.property('token');
    }));
    it('Test by verifying that the failure message occurs if you provide an email or password that does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        sinon.stub(bcrypt, 'compare').resolves(false);
        const res = yield chai
            .request(app_1.app)
            .post('/login')
            .send(login_mock_1.adminWithEmailWrong);
        expect(res.status).to.be.equal(401);
        expect(res.body.message).to.be.deep.equal('Incorrect email or password');
    }));
    it('Test by verifying that the failure message occurs if you provide an email or password that does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        sinon.stub(bcrypt, 'compare').resolves(false);
        const res = yield chai
            .request(app_1.app)
            .post('/login')
            .send(login_mock_1.adminWithPasswordWrong);
        expect(res.status).to.be.equal(401);
        expect(res.body.message).to.be.deep.equal('Incorrect email or password');
    }));
    it('Test by checking if the failure message occurs if you leave any white space', () => __awaiter(void 0, void 0, void 0, function* () {
        sinon.stub(bcrypt, 'compare').resolves(false);
        const res = yield chai
            .request(app_1.app)
            .post('/login')
            .send({ email: 'admin@admin.com' });
        expect(res.status).to.be.equal(400);
        expect(res.body.message).to.be.deep.equal('All fields must be filled');
    }));
    it("Test checking if it returns the user's 'role'", () => __awaiter(void 0, void 0, void 0, function* () {
        const loginService = new LoginService_1.default();
        sinon.stub(bcrypt, 'compare').resolves(true);
        sinon.stub(loginService, 'validate').resolves({ role: 'admin' });
        const res = yield chai
            .request(app_1.app)
            .post('/login')
            .send(login_mock_1.adminUser);
        const response = yield chai
            .request(app_1.app)
            .get('/login/validate')
            .set('authorization', res.body.token);
        expect(response.status).to.be.equal(200);
        expect(response.body.role).to.be.equal('admin');
    }));
});
