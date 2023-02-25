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
const MatchesService_1 = __importDefault(require("../service/MatchesService"));
class MatchesController {
    constructor(matcherService = new MatchesService_1.default()) {
        this.matcherService = matcherService;
        this.getMatches = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { inProgress } = req.query;
            if (inProgress === 'true') {
                const matches = yield this.matcherService.getMatchesInProgress();
                return res.status(200).json(matches);
            }
            if (inProgress === 'false') {
                const matches = yield this.matcherService.getMatchesFinished();
                return res.status(200).json(matches);
            }
            const matches = yield this.matcherService.getMatches();
            return res.status(200).json(matches);
        });
        this.saveMatchesInProgress = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const matches = yield this.matcherService
                .saveMatchesInProgress(req.body);
            if (matches.status) {
                return res.status(matches.status).json({ message: matches.message });
            }
            return res.status(201).json(matches.message);
        });
        this.changeMatchesInProgress = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const matches = yield this.matcherService
                .changeMatchesInProgress(+id);
            if (matches.status) {
                return res.status(matches.status).json({ message: matches.message });
            }
            return res.status(200).json(matches.message);
        });
        this.UpdateMatches = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { homeTeamGoals, awayTeamGoals } = req.body;
            const matches = yield this.matcherService.UpdateMatches(+id, homeTeamGoals, awayTeamGoals);
            if (matches.status) {
                return res.status(matches.status).json({ message: matches.message });
            }
            return res.status(200).json(matches.message);
        });
    }
}
exports.default = MatchesController;
