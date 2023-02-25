"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TeamsController_1 = __importDefault(require("../controller/TeamsController"));
const teamsController = new TeamsController_1.default();
const router = (0, express_1.Router)();
router.get('/teams', teamsController.getAllTeams);
router.get('/teams/:id', teamsController.getTeamsByTeamId);
exports.default = router;
