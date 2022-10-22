import { Request, Response } from 'express';
import TeamsService from '../service/TeamsService';

export default class TeamsController {
  constructor(private teamsService = new TeamsService()) {}

  public getAllTeams = async (req: Request, res: Response) => {
    const teams = await this.teamsService.getAllTeams();
    return res.status(200).json(teams);
  };

  public getTeamsByTeamId = async (req: Request, res: Response) => {
    const { id } = req.params;
    const teams = await this.teamsService.getTeamsByTeamId(+id);
    return res.status(200).json(teams);
  };
}
