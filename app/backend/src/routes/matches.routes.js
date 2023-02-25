"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MatchesController_1 = __importDefault(require("../controller/MatchesController"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const matchesController = new MatchesController_1.default();
const router = (0, express_1.Router)();
router.get('/matches', matchesController.getMatches);
router.post('/matches', auth_1.default, matchesController.saveMatchesInProgress);
router.patch('/matches/:id/finish', matchesController.changeMatchesInProgress);
router.patch('/matches/:id', matchesController.UpdateMatches);
exports.default = router;
