import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';

class TeamsController {
  public service: TeamsService;

  constructor() {
    this.service = new TeamsService();
  }

  public getAll = async (_req: Request, res: Response) => {
    const allTeams = await this.service.allTeams();
    return res.status(200).json(allTeams);
  };

  public getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const teamById = await this.service.getById(Number(id));
    return res.status(200).json(teamById);
  };
}

export default new TeamsController();
