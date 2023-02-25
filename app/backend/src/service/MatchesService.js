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
const matches_1 = __importDefault(require("../database/models/matches"));
const teams_1 = __importDefault(require("../database/models/teams"));
class MatchesService {
    constructor() {
        this.getMatches = () => __awaiter(this, void 0, void 0, function* () {
            const matches = yield matches_1.default.findAll({
                include: [
                    {
                        model: teams_1.default,
                        as: 'teamHome',
                        attributes: ['teamName'],
                    },
                    {
                        model: teams_1.default,
                        as: 'teamAway',
                        attributes: ['teamName'],
                    },
                ],
            });
            return matches;
        });
        this.getMatchesInProgress = () => __awaiter(this, void 0, void 0, function* () {
            const matches = yield this.getMatches();
            const inProgress = matches.filter((game) => game.inProgress === true);
            return inProgress;
        });
        this.getMatchesFinished = () => __awaiter(this, void 0, void 0, function* () {
            const matches = yield this.getMatches();
            const finishMatch = matches.filter((game) => game.inProgress === false);
            return finishMatch;
        });
        this.saveMatchesInProgress = (match) => __awaiter(this, void 0, void 0, function* () {
            const teams = yield Promise.all([
                teams_1.default.findByPk(match.awayTeam),
                teams_1.default.findByPk(match.homeTeam),
            ]);
            if (!teams.every((team) => team)) {
                return { status: 404, message: 'There is no team with such id!' };
            }
            const result = yield matches_1.default.create(Object.assign(Object.assign({}, match), { inProgress: true }));
            if (match.awayTeam === match.homeTeam) {
                return { status: 422, message: 'It is not possible to create a match with two equal teams' };
            }
            return { status: null, message: result };
        });
        this.changeMatchesInProgress = (id) => __awaiter(this, void 0, void 0, function* () {
            yield matches_1.default.update({ inProgress: false }, { where: { id } });
            return { status: null, message: 'Finished' };
        });
        this.UpdateMatches = (id, homeTeamGoals, awayTeamGoals) => __awaiter(this, void 0, void 0, function* () {
            const result = yield matches_1.default.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
            return { status: null, message: result };
        });
    }
}
exports.default = MatchesService;
