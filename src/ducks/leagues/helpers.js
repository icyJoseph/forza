// keeping this just to show evolution of reasoning
export const playerGoalsAccumulator = (goals, { goalsLastSeason }) =>
  goals + goalsLastSeason;

// keeping this just to show evolution of reasoning
// export const teamGoalsAcculmulator = (goals, { teamGoalsLastSeason }) =>
//   goals + teamGoalsLastSeason;

export const goalsAcculmulator = (
  goals,
  { goalsLastSeason = 0, teamGoalsLastSeason = 0 }
) => goals + goalsLastSeason + teamGoalsLastSeason;

// keeping this just to show evolution of reasoning
export const reformat = allLeagues =>
  allLeagues.reduce(
    (acc, league) => ({
      ...acc,
      [league.leagueId]: {
        ...league,
        teams: league.teams.map(team => ({
          ...team,
          teamGoalsLastSeason: team.topPlayers.reduce(playerGoalsAccumulator, 0)
        })),
        leagueGoalsLastSeason: league.teams.reduce(
          (acc, team) =>
            acc + team.topPlayers.reduce(playerGoalsAccumulator, 0),
          0
        )
      }
    }),
    {}
  );

// map and fold
export const efficientReformat = allLeagues =>
  allLeagues
    .map(league => ({
      ...league,
      teams: league.teams.map(team => ({
        ...team,
        teamGoalsLastSeason: team.topPlayers.reduce(goalsAcculmulator, 0)
      }))
    }))
    .reduce(
      (acc, league) => ({
        ...acc,
        [league.leagueId]: {
          ...league,
          leagueGoalsLastSeason: league.teams.reduce(goalsAcculmulator, 0)
        }
      }),
      {}
    );
