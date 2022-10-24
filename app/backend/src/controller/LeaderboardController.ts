import { Request, Response } from 'express';
import LeaderboardsService from '../service/LeaderboardsService';

export default class LeaderboardsController {
  constructor(private leaderboardsService = new LeaderboardsService()) {}

  public getLeaderboardResultsHome = async (req: Request, res: Response) => {
    const leaderboards = await this.leaderboardsService.getTeamHomeResults();
    return res.status(200).json(leaderboards);
  };

  public getLeaderboardResultsAway = async (req: Request, res: Response) => {
    const leaderboards = await this.leaderboardsService.getTeamAwayResults();
    return res.status(200).json(leaderboards);
  };

  public getLeaderboardResults = async (req: Request, res: Response) => {
    const leaderboards = await this.leaderboardsService.getAllTeamResults();
    return res.status(200).json(leaderboards);
  };
}
