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
    return res.status(200).json(matches);
  };

  public saveMatchesInProgress = async (req: Request, res: Response) => {
    const matches = await this.matcherService
      .saveMatchesInProgress(req.body);
    if (matches.status) {
      return res.status(matches.status).json({ message: matches.message });
    }
    return res.status(201).json(matches.message);
  };

  public changeMatchesInProgress = async (req: Request, res: Response) => {
    const { id } = req.params;
    const matches = await this.matcherService
      .changeMatchesInProgress(+id);
    if (matches.status) {
      return res.status(matches.status).json({ message: matches.message });
    }
    return res.status(200).json(matches.message);
  };
}
