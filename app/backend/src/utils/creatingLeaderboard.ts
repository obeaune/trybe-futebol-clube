import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';

interface ITeamData {
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number
}

// counting victory points ->
const victoryPoints = (matchesHome: Matches[], matchesAway: Matches[]) => {
  let total = 0;
  matchesHome.forEach((match) => {
    if (match.homeTeamGoals > match.awayTeamGoals) { total += 1; }
  });
  matchesAway.forEach((match) => {
    if (match.awayTeamGoals > match.homeTeamGoals) { total += 1; }
  });
  return total;
};

// counting the tie points ->
const drawPoints = (matchesHome: Matches[], matchesAway: Matches[]) => {
  let total = 0;
  matchesHome.forEach((match) => {
    if (match.homeTeamGoals === match.awayTeamGoals) { total += 1; }
  });
  matchesAway.forEach((match) => {
    if (match.awayTeamGoals === match.homeTeamGoals) { total += 1; }
  });
  return total;
};

// counting the lost points ->
const lostPoints = (matchesHome: Matches[], matchesAway: Matches[]) => {
  let total = 0;
  matchesHome.forEach((match) => {
    if (match.homeTeamGoals < match.awayTeamGoals) { total += 1; }
  });
  matchesAway.forEach((match) => {
    if (match.awayTeamGoals < match.homeTeamGoals) { total += 1; }
  });
  return total;
};

// counting the total of goals in favor ->
const goalsInFavor = (matchesHome: Matches[], matchesAway: Matches[]) => {
  let total = 0;
  matchesHome.forEach((match) => { total += match.homeTeamGoals; });
  matchesAway.forEach((match) => { total += match.awayTeamGoals; });
  return total;
};

// counting the total of own points ->
const tGoalsOwn = (matchesHome: Matches[], matchesAway: Matches[]) => {
  let total = 0;
  matchesHome.forEach((match) => { total += match.awayTeamGoals; });
  matchesAway.forEach((match) => { total += match.homeTeamGoals; });
  return total;
};

const createResult = (
  name: string,
  teamData: ITeamData,
) => ({
  name,
  totalPoints: teamData.totalPoints,
  totalGames: teamData.totalGames,
  totalVictories: teamData.totalVictories,
  totalDraws: teamData.totalDraws,
  totalLosses: teamData.totalLosses,
  goalsFavor: teamData.goalsFavor,
  goalsOwn: teamData.goalsOwn,
  goalsBalance: teamData.goalsFavor - teamData.goalsOwn,
  efficiency: Number(((teamData.totalPoints / (teamData.totalGames * 3)) * 100).toFixed(2)),
});

const createLeaderboad = (team: Teams, matches: Matches[]) => {
  const matchesAsHome = matches.filter((match) => match.homeTeam === team.id);

  const matchesAsAway = matches.filter((match) => match.awayTeam === team.id);

  const totalVictories = victoryPoints(matchesAsHome, matchesAsAway);

  const totalDraws = drawPoints(matchesAsHome, matchesAsAway);

  const totalLosses = lostPoints(matchesAsHome, matchesAsAway);

  const goalsFavor = goalsInFavor(matchesAsHome, matchesAsAway);

  const goalsOwn = tGoalsOwn(matchesAsHome, matchesAsAway);

  const totalPoints = (totalVictories * 3) + totalDraws;

  const totalGames = matchesAsHome.length + matchesAsAway.length;

  return createResult(
    team.teamName,
    { totalPoints, totalGames, totalVictories, totalDraws, totalLosses, goalsFavor, goalsOwn },
  );
};

export default createLeaderboad;
