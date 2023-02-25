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
const LeaderBoards_1 = __importDefault(require("../utils/LeaderBoards"));
const teams_1 = __importDefault(require("../database/models/teams"));
const matches_1 = __importDefault(require("../database/models/matches"));
class LeaderboardService {
    constructor() {
        this.filterMatchesAndTeams = () => __awaiter(this, void 0, void 0, function* () {
            const getTeams = yield teams_1.default.findAll();
            const getResultsMatchesFinished = yield matches_1.default.findAll({ where: { inProgress: false } });
            return { getTeams, getResultsMatchesFinished };
        });
        this.getTeamHomeResults = () => __awaiter(this, void 0, void 0, function* () {
            const { getTeams, getResultsMatchesFinished } = yield this.filterMatchesAndTeams();
            const result = getTeams.map((team) => {
                const matches = getResultsMatchesFinished.filter((match) => match.homeTeam === team.id);
                return new LeaderBoards_1.default(matches).ResultTeams(team);
            });
            return result.sort((a, b) => b.totalPoints - a.totalPoints
                || b.totalVictories - a.totalVictories
                || b.goalsBalance - a.goalsBalance
                || b.goalsFavor - a.goalsFavor
                || b.goalsOwn - a.goalsOwn);
        });
        this.getTeamAwayResults = () => __awaiter(this, void 0, void 0, function* () {
            const { getTeams, getResultsMatchesFinished } = yield this.filterMatchesAndTeams();
            const result = getTeams.map((team) => {
                const matches = getResultsMatchesFinished.filter((match) => match.awayTeam === team.id);
                return new LeaderBoards_1.default(matches).ResultTeams(team);
            });
            return result.sort((a, c) => c.totalPoints - a.totalPoints
                || c.totalVictories - a.totalVictories
                || c.goalsBalance - a.goalsBalance
                || c.goalsFavor - a.goalsFavor
                || c.goalsOwn - a.goalsOwn);
        });
        this.getAllTeamResults = () => __awaiter(this, void 0, void 0, function* () {
            const { getTeams, getResultsMatchesFinished } = yield this.filterMatchesAndTeams();
            const result = getTeams.map((team) => {
                const matches = getResultsMatchesFinished
                    .filter((match) => match.homeTeam === team.id || match.awayTeam === team.id);
                return new LeaderBoards_1.default(matches).ResultTeams(team);
            });
            return result.sort((c, b) => b.totalPoints - c.totalPoints
                || b.totalVictories - c.totalVictories
                || b.goalsBalance - c.goalsBalance
                || b.goalsFavor - c.goalsFavor
                || b.goalsOwn - c.goalsOwn);
        });
    }
}
exports.default = LeaderboardService;
