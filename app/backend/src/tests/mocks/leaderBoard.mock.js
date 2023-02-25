"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaderboardsResultAwayEquals = exports.leaderboardsResultAway = exports.TeamsIdAndName = exports.leaderboardsResultHomeEquals = exports.leaderboardsResultHome = void 0;
exports.leaderboardsResultHome = [
    {
        id: 1,
        homeTeam: 4,
        homeTeamGoals: 3,
        awayTeam: 11,
        awayTeamGoals: 0,
        inProgress: false,
        teamHome: {
            teamName: "Corinthians",
        },
        teamAway: {
            teamName: "Napoli-SC",
        },
    },
    {
        id: 2,
        homeTeam: 11,
        homeTeamGoals: 2,
        awayTeam: 4,
        awayTeamGoals: 3,
        inProgress: false,
        teamHome: {
            teamName: "Napoli-SC",
        },
        teamAway: {
            teamName: "Corinthians",
        },
    },
];
exports.leaderboardsResultHomeEquals = [
    {
        name: "Corinthians",
        totalPoints: 3,
        totalGames: 1,
        totalVictories: 1,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 3,
        goalsOwn: 0,
        goalsBalance: 3,
        efficiency: '100.00'
    },
    {
        name: "Napoli-SC",
        totalPoints: 0,
        totalGames: 1,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 1,
        goalsFavor: 2,
        goalsOwn: 3,
        goalsBalance: -1,
        efficiency: '0.00'
    }
];
exports.TeamsIdAndName = [
    {
        id: 4,
        teamName: "Corinthians"
    },
    {
        id: 11,
        teamName: "Napoli-SC"
    }
];
exports.leaderboardsResultAway = [{
        id: 1,
        homeTeam: 11,
        homeTeamGoals: 2,
        awayTeam: 4,
        awayTeamGoals: 3,
        inProgress: false,
        teamHome: {
            teamName: "Napoli-SC",
        },
        teamAway: {
            teamName: "Corinthians",
        },
    },
    {
        id: 2,
        homeTeam: 4,
        homeTeamGoals: 4,
        awayTeam: 11,
        awayTeamGoals: 2,
        inProgress: false,
        teamHome: {
            teamName: "Corinthians",
        },
        teamAway: {
            teamName: "Napoli-SC",
        },
    },
];
exports.leaderboardsResultAwayEquals = [
    {
        name: "Corinthians",
        totalPoints: 3,
        totalGames: 1,
        totalVictories: 1,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 3,
        goalsOwn: 2,
        goalsBalance: 1,
        efficiency: '100.00'
    },
    {
        name: "Napoli-SC",
        totalPoints: 0,
        totalGames: 1,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 1,
        goalsFavor: 2,
        goalsOwn: 4,
        goalsBalance: -2,
        efficiency: '0.00'
    }
];
