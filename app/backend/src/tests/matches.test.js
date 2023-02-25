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
const sinon = __importStar(require("sinon"));
const chai = __importStar(require("chai"));
const Jwt = __importStar(require("jsonwebtoken"));
// @ts-ignore
const chaiHttp = require("chai-http");
const app_1 = require("../app");
const teams_1 = __importDefault(require("../database/models/teams"));
const matches_1 = __importDefault(require("../database/models/matches"));
const matches_mocks_1 = require("./mocks/matches.mocks");
chai.use(chaiHttp);
const { expect } = chai;
describe("Test on matches routes ", () => {
    beforeEach(sinon.restore);
    it("Test when 'inProgress' equals true ", () => __awaiter(void 0, void 0, void 0, function* () {
        sinon
            .stub(matches_1.default, "findAll")
            .resolves([matches_mocks_1.InProgressTrue,]);
        const response = yield chai.request(app_1.app).get("/matches?inProgress=true");
        expect(response.status).to.equal(200);
        expect(response.body[0]).to.have.property("teamName").equal("corinthians");
    }));
    it("Test when 'inProgress' equals false", () => __awaiter(void 0, void 0, void 0, function* () {
        sinon
            .stub(matches_1.default, "findAll")
            .resolves([matches_mocks_1.InProgressFalse,
        ]);
        const response = yield chai.request(app_1.app).get("/matches?inProgress=false");
        expect(response.status).to.equal(200);
        expect(response.body[0]).to.have.property("teamName").equal("corinthians");
    }));
    it("Test when 'InProgress' is not passed", () => __awaiter(void 0, void 0, void 0, function* () {
        sinon.stub(matches_1.default, "findAll").resolves([]);
        const response = yield chai.request(app_1.app).get("/matches");
        expect(response.status).to.equal(200);
        expect(Array.isArray(response.body)).to.be.equal(true);
    }));
    it("Test route /matches/:id/finish", () => __awaiter(void 0, void 0, void 0, function* () {
        sinon.stub(matches_1.default, "update").resolves();
        const response = yield chai
            .request(app_1.app)
            .patch("/matches/4/finish")
            .set("params", "id");
        expect(response.status).to.equal(200);
        expect(response.body).to.equal("Finished");
    }));
    it("Test route /matches/:id", () => __awaiter(void 0, void 0, void 0, function* () {
        sinon.stub(matches_1.default, "update").resolves();
        const response = yield chai
            .request(app_1.app)
            .patch("/matches/4")
            .set("params", "id")
            .send({
            homeTeamGoals: 1,
            awayTeamGoals: 2,
        });
        expect(response.status).to.equal(200);
        expect(response.body).to.equal("");
    }));
    it("Test by checking if the failure message occurs if you provide an id that does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        sinon.stub(Jwt, "verify").resolves({ email: "trybe@trybe.com" });
        sinon.stub(teams_1.default, "findOne").resolves();
        sinon
            .stub(matches_1.default, "create")
            .resolves(matches_mocks_1.InProgressFalse);
        const response = yield chai
            .request(app_1.app)
            .post("/matches")
            .set("authorization", "1234abcd")
            .send(matches_mocks_1.TeamIdNotExist);
        expect(response.status).to.equal(404);
        expect(response.body)
            .to.have.property("message")
            .equal("There is no team with such id!");
    }));
});
