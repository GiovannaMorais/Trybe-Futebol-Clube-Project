import { Request, Response } from 'express';
import MatchesService from '../service/MatchesService';

export default class MatchesController {
  constructor(private matcherService = new MatchesService()) {}

  public getMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;

    if (inProgress === 'true') {
      const matches = await this.matcherService.getMatchesInProgress();
      return res.status(200).json(matches);
    }
    if (inProgress === 'false') {
      const matches = await this.matcherService.getMatchesFinished();
      return res.status(200).json(matches);
    }

    const matches = await this.matcherService.getMatches();
    // console.log('matches', matches);
    return res.status(200).json(matches);
  };
}
