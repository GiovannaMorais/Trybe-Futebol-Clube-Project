"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Leaderboards {
    constructor(leaderboard) {
        this.leaderboard = leaderboard;
        this.totalPoints = (teams) => {
            let points = 0;
            const victories = this.MatchesWithVictories(teams);
            const draws = this.MatchesWithDraws();
            this.leaderboard.forEach((match) => {
                if (match.homeTeam === teams.id) {
                    points = victories * 3 + draws * 1;
                }
                if (match.awayTeam === teams.id) {
                    points = victories * 3 + draws * 1;
                }
            });
            return points;
        };
        this.totalMatches = (teams) => {
            let matches = 0;
            this.leaderboard.forEach((match) => {
                if (match.homeTeam === teams.id)
                    matches += 1;
                if (match.awayTeam === teams.id)
                    matches += 1;
            });
            return matches;
        };
        this.efficiencyOfTeam = (teams) => {
            const P = this.totalPoints(teams);
            const J = this.totalMatches(teams);
            const percentage = ((P / (J * 3)) * 100);
            return percentage.toFixed(2);
        };
        this.goalsScoreInFavor = (teams) => {
            let GP = 0;
            this.leaderboard.forEach((match) => {
                if (match.homeTeam === teams.id)
                    GP += match.homeTeamGoals;
                if (match.awayTeam === teams.id)
                    GP += match.awayTeamGoals;
            });
            return GP;
        };
        this.goalsConceded = (teams) => {
            let GC = 0;
            this.leaderboard.forEach((match) => {
                if (match.awayTeam === teams.id)
                    GC += match.homeTeamGoals;
                if (match.homeTeam === teams.id)
                    GC += match.awayTeamGoals;
            });
            return GC;
        };
        this.goalsBalance = (teams) => {
            const GP = this.goalsScoreInFavor(teams);
            const GC = this.goalsConceded(teams);
            const goalBalance = GP - GC;
            return goalBalance;
        };
        this.MatchesWithVictories = (teams) => {
            let victories = 0;
            this.leaderboard.forEach((match) => {
                if (match.awayTeam === teams.id && match.homeTeamGoals < match.awayTeamGoals)
                    victories += 1;
                if (match.homeTeam === teams.id && match.homeTeamGoals > match.awayTeamGoals)
                    victories += 1;
            });
            return victories;
        };
        this.MatchesWithDraws = () => {
            let draws = 0;
            this.leaderboard.forEach((match) => {
                if (match.awayTeamGoals === match.homeTeamGoals)
                    draws += 1;
            });
            return draws;
        };
        this.MatchesWithDefeat = (teams) => {
            let defeat = 0;
            this.leaderboard.forEach((match) => {
                if (teams.id === match.awayTeam
                    && match.homeTeamGoals > match.awayTeamGoals)
                    defeat += 1;
                if (teams.id === match.homeTeam
                    && match.homeTeamGoals < match.awayTeamGoals)
                    defeat += 1;
            });
            return defeat;
        };
        this.ResultTeams = (teams) => ({
            name: teams.teamName,
            totalPoints: this.totalPoints(teams),
            totalGames: this.totalMatches(teams),
            totalVictories: this.MatchesWithVictories(teams),
            totalDraws: this.MatchesWithDraws(),
            totalLosses: this.MatchesWithDefeat(teams),
            goalsFavor: this.goalsScoreInFavor(teams),
            goalsOwn: this.goalsConceded(teams),
            goalsBalance: this.goalsBalance(teams),
            efficiency: this.efficiencyOfTeam(teams),
        });
    }
}
exports.default = Leaderboards;
