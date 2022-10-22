import Matches from '../database/models/matches';
import Teams from '../database/models/teams';

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
}
