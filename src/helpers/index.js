const pickTopPlayers = ({ topPlayers, ...team }) =>
  topPlayers.reduce((prev, { playerName, ...player }) => {
    return { ...prev, [playerName]: { playerName, ...player, ...team } };
  }, {});

export const buildPlayersTree = teams =>
  teams.reduce((otherTopPlayers, team) => {
    const teamTopPlayers = pickTopPlayers(team);

    return {
      ...otherTopPlayers,
      ...teamTopPlayers
    };
  }, {});

export const curry = f => (...a) => (...b) => f(...a, ...b);

export const goHome = history => history.push("/");
