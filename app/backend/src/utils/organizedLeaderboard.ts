import ILeaderboard from '../interfaces/ILeaderboard';

export default function sortLeaderboard(leaderboard: ILeaderboard[]) {
  return leaderboard.sort(
    (a, b) => b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor,
  );
}
