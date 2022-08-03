import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';
import HttpException from '../shared/HttpException';

class TeamsService {
  public allMatches = async () => {
    const getAll = await Matches.findAll({
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
        }],
    });
    return getAll;
  };

  public getById = async (id: number) => {
    const matchById = await Matches.findAll({ where: { id } });
    return matchById;
  };

  public getByProgress = async (inProgress: boolean) => {
    const matchByProgress = await Matches.findAll({
      where: { inProgress },
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
        }],
    });
    return matchByProgress;
  };

  public createMatch = async (
    homeTeam: number,
    awayTeam: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) => {
    await this.matchIsUnique(homeTeam, awayTeam);
    await this.matchIsAvailable(homeTeam, awayTeam);
    const create = await Matches.create({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });
    return create;
  };

  public update = async (id: number) => {
    const findMatch = await this.getById(id);
    if (!findMatch) throw new HttpException(404, 'Match not found! :(');
    await Matches.update({ inProgress: false }, { where: { id } });
    return { message: 'Finished' };
  };

  public matchIsUnique = async (homeTeam: number, awayTeam: number) => {
    if (homeTeam === awayTeam) {
      throw new HttpException(401, 'It is not possible to create a match with two equal teams');
    }
  };

  public matchIsAvailable = async (homeTeam: number, awayTeam: number) => {
    const firstTeam = await this.getById(homeTeam);
    const secondTeam = await this.getById(awayTeam);
    if (!firstTeam || !secondTeam) {
      throw new HttpException(404, 'There is no team with such id!');
    }
  };

  public changeScoreboard = async (id: number, homeTeamGoals: number, awayTeamGoals: number) => {
    const findMatch = await Matches.findOne({ where: { id, inProgress: true } });
    if (!findMatch) throw new HttpException(404, 'There is no match with such id!');
    const [updated] = await Matches.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    return updated;
  };
}

export default TeamsService;
