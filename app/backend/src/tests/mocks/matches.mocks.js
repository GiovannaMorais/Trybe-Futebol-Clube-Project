"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamIdNotExist = exports.InProgressFalse = exports.InProgressTrue = void 0;
exports.InProgressTrue = {
    id: 1,
    teamName: "corinthians",
    inProgress: true,
};
exports.InProgressFalse = {
    id: 1,
    teamName: "corinthians",
    inProgress: false,
};
exports.TeamIdNotExist = {
    homeTeam: 12345,
    awayTeam: 3,
    homeTeamGoals: 1,
    awayTeamGoals: 3,
};
