"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LeaderboardController_1 = __importDefault(require("../controller/LeaderboardController"));
const router = (0, express_1.Router)();
const leaderboardController = new LeaderboardController_1.default();
router.get('/leaderboard/home', leaderboardController.getLeaderboardResultsHome);
router.get('/leaderboard/away', leaderboardController.getLeaderboardResultsAway);
router.get('/leaderboard', leaderboardController.getLeaderboardResults);
exports.default = router;
