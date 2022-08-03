import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

class MatchesController {
  public service: MatchesService;

  constructor() {
    this.service = new MatchesService();
  }

  public getMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    if (inProgress) {
      let query = false;
      if (inProgress === 'true') query = true;
      const result = await this.service.getByProgress(query);
      return res.status(200).json(result);
    }
    const allMatches = await this.service.allMatches();
    return res.status(200).json(allMatches);
  };

  public getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.service.getById(Number(id));
    return res.status(200).json(result);
  };

  public createMatch = async (req: Request, res: Response) => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
    const create = await this.service.createMatch(homeTeam, awayTeam, homeTeamGoals, awayTeamGoals);
    return res.status(201).json(create);
  };

  public updateProgress = async (req: Request, res: Response) => {
    const { id } = req.params;
    const update = await this.service.update(Number(id));
    return res.status(200).json(update);
  };

  public changeScoreboard = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this.service.changeScoreboard(Number(id), homeTeamGoals, awayTeamGoals);
    return res.status(200).json({ message: `The score of match ${id} has been updated` });
  };
}

export default new MatchesController();
