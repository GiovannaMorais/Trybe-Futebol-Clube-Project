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
const TeamsService_1 = __importDefault(require("../service/TeamsService"));
class TeamsController {
    constructor(teamsService = new TeamsService_1.default()) {
        this.teamsService = teamsService;
        this.getAllTeams = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const teams = yield this.teamsService.getAllTeams();
            return res.status(200).json(teams);
        });
        this.getTeamsByTeamId = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const teams = yield this.teamsService.getTeamsByTeamId(+id);
            return res.status(200).json(teams);
        });
    }
}
exports.default = TeamsController;
