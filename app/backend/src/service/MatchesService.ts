import Matches from '../database/models/matches';
import Teams from '../database/models/teams';

interface SaveMatch {
  id?: number;
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress?:boolean;
}

export default class MatchesService {
  public getMatches = async () => {
    const matches = await Matches.findAll({
      include: [
        {
          model: Teams,
          as: 'teamHome',
          attributes: ['teamName'],
        },
        {
          model: Teams,
          as: 'teamAway',
          attributes: ['teamName'],
        },
      ],
    });

    return matches;
  };

  public getMatchesInProgress = async () => {
    const matches = await this.getMatches();
    const inProgress = matches.filter((game) => game.inProgress === true);
    return inProgress;
  };

  public getMatchesFinished = async () => {
    const matches = await this.getMatches();
    const finishMatch = matches.filter((game) => game.inProgress === false);
    return finishMatch;
  };

  public saveMatchesInProgress = async (match: SaveMatch) => {
    const teams = await Promise.all([
      Teams.findByPk(match.awayTeam),
      Teams.findByPk(match.homeTeam),
    ]);
    if (!teams.every((team) => team)) {
      return { status: 404, message: 'There is no team with such id!' };
    }
    const result = await Matches.create({ ...match, inProgress: true });

    if (match.awayTeam === match.homeTeam) {
      return { status: 422, message: 'It is not possible to create a match with two equal teams' };
    }

    return { status: null, message: result };
  };

  public changeMatchesInProgress = async (id:number) => {
    await Matches.update({ inProgress: false }, { where: { id } });
    return { status: null, message: 'Finished' };
  };
}
