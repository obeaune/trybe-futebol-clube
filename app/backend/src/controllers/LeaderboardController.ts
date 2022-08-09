import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

class LeaderboardController {
  public service: LeaderboardService;

  constructor() {
    this.service = new LeaderboardService();
  }

  public getAll = async (req: Request, res: Response) => {
    const leaderboard = await this.service.getLeaderboard();
    return res.status(200).json(leaderboard);
  };
}

export default new LeaderboardController();
