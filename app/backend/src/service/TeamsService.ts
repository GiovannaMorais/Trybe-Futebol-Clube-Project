import Teams from '../database/models/teams';

export default class TeamsService {
  public getAllTeams = async () => {
    const teams = await Teams.findAll();
    return teams;
  };

  public getTeamsByTeamId = async (id: number) => {
    const teams = await Teams.findByPk(id);
    return teams;
  };
}
