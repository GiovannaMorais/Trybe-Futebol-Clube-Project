import Leaderboard from '../utils/LeaderBoards';
import Teams from '../database/models/teams';
import Matches from '../database/models/matches';

export default class LeaderboardService {
  public filterMatchesAndTeams = async () => {
    const getTeams = await Teams.findAll();
    const getResultsMatchesFinished = await Matches.findAll({ where: { inProgress: false } });
    return { getTeams, getResultsMatchesFinished };
  };

  public getTeamHomeResults = async () => {
    const { getTeams, getResultsMatchesFinished } = await this.filterMatchesAndTeams();

    const result = getTeams.map((team) => {
      const matches = getResultsMatchesFinished.filter((match) => match.homeTeam === team.id);
      return new Leaderboard(matches).ResultTeams(team);
    });
    return result.sort((a, b) => b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || b.goalsOwn - a.goalsOwn);
  };

  public getTeamAwayResults = async () => {
    const { getTeams, getResultsMatchesFinished } = await this.filterMatchesAndTeams();

    const result = getTeams.map((team) => {
      const matches = getResultsMatchesFinished.filter((match) => match.awayTeam === team.id);
      return new Leaderboard(matches).ResultTeams(team);
    });
    return result.sort((a, c) => c.totalPoints - a.totalPoints
    || c.totalVictories - a.totalVictories
    || c.goalsBalance - a.goalsBalance
    || c.goalsFavor - a.goalsFavor
    || c.goalsOwn - a.goalsOwn);
  };

  public getAllTeamResults = async () => {
    const { getTeams, getResultsMatchesFinished } = await this.filterMatchesAndTeams();

    const result = getTeams.map((team) => {
      const matches = getResultsMatchesFinished
        .filter((match) => match.homeTeam === team.id || match.awayTeam === team.id);
      return new Leaderboard(matches).ResultTeams(team);
    });
    return result.sort((c, b) => b.totalPoints - c.totalPoints
    || b.totalVictories - c.totalVictories
    || b.goalsBalance - c.goalsBalance
    || b.goalsFavor - c.goalsFavor
    || b.goalsOwn - c.goalsOwn);
  };
}
