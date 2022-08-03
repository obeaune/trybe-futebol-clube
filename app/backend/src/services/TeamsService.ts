import Teams from '../database/models/Teams';

class TeamsService {
  public allTeams = async () => {
    const getAll = await Teams.findAll();
    return getAll;
  };

  public getById = async (id: number) => {
    const teamById = await Teams.findByPk(id);
    return teamById;
  };
}

export default TeamsService;
