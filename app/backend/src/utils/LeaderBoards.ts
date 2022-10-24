import Teams from '../database/models/teams';
import Matches from '../database/models/matches';
import { Leaderboard } from '../interfaces/LeaderBoard';

export default class Leaderboards {
  constructor(private leaderboard: Matches[]) { }

  public totalPoints = (teams: Teams) => {
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

  public totalMatches = (teams: Teams) => {
    let matches = 0;
    this.leaderboard.forEach((match) => {
      if (match.homeTeam === teams.id) matches += 1;
      if (match.awayTeam === teams.id) matches += 1;
    });
    return matches;
  };

  public efficiencyOfTeam = (teams: Teams) => {
    const P = this.totalPoints(teams);
    const J = this.totalMatches(teams);
    const percentage = ((P / (J * 3)) * 100);
    return percentage.toFixed(2);
  };

  public goalsScoreInFavor = (teams: Teams) => {
    let GP = 0;
    this.leaderboard.forEach((match) => {
      if (match.homeTeam === teams.id) GP += match.homeTeamGoals;
      if (match.awayTeam === teams.id) GP += match.awayTeamGoals;
    });
    return GP;
  };

  public goalsConceded = (teams: Teams) => {
    let GC = 0;
    this.leaderboard.forEach((match) => {
      if (match.awayTeam === teams.id) GC += match.homeTeamGoals;
      if (match.homeTeam === teams.id) GC += match.awayTeamGoals;
    });
    return GC;
  };

  public goalsBalance = (teams: Teams) => {
    const GP = this.goalsScoreInFavor(teams);
    const GC = this.goalsConceded(teams);
    const goalBalance = GP - GC;
    return goalBalance;
  };

  public MatchesWithVictories = (teams: Teams) => {
    let victories = 0;
    this.leaderboard.forEach((match) => {
      if (match.awayTeam === teams.id && match.homeTeamGoals < match.awayTeamGoals) victories += 1;
      if (match.homeTeam === teams.id && match.homeTeamGoals > match.awayTeamGoals) victories += 1;
    });
    return victories;
  };

  public MatchesWithDraws = () => {
    let draws = 0;
    this.leaderboard.forEach((match) => {
      if (match.awayTeamGoals === match.homeTeamGoals) draws += 1;
    });
    return draws;
  };

  public MatchesWithDefeat = (teams: Teams) => {
    let defeat = 0;
    this.leaderboard.forEach((match) => {
      if (teams.id === match.awayTeam
        && match.homeTeamGoals > match.awayTeamGoals) defeat += 1;
      if (teams.id === match.homeTeam
        && match.homeTeamGoals < match.awayTeamGoals) defeat += 1;
    });
    return defeat;
  };

  public ResultTeams = (teams: Teams):Leaderboard => ({
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
