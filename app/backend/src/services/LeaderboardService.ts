import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';
import createLeaderboard from '../utils/creatingLeaderboard';
import inOrderLeaderboard from '../utils/organizedLeaderboard';

class LeaderboardService {
  public getLeaderboard = async () => {
    // all finished games ->
    const getMatches = await Matches.findAll({
      where: { inProgress: false },
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

    // all teams ->
    const getTeams = await Teams.findAll();

    // leaderboard out of order ->
    const leaderboardUnorganized = getTeams.map((team) => createLeaderboard(team, getMatches));

    // returning the finished leaderboard in order ->
    const sorted = inOrderLeaderboard(leaderboardUnorganized);
    return sorted;
  };
}

export default LeaderboardService;
