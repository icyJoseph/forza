const pickTopPlayers = ({ topPlayers, ...team }, leagueName) =>
  topPlayers.reduce((prev, { playerName, ...player }) => {
    return {
      ...prev,
      [playerName]: { playerName, ...player, ...team, leagueName }
    };
  }, {});

export const buildPlayersTree = (teams, leagueName) =>
  teams.reduce((otherTopPlayers, team) => {
    const teamTopPlayers = pickTopPlayers(team, leagueName);

    return {
      ...otherTopPlayers,
      ...teamTopPlayers
    };
  }, {});

export const curry = f => (...a) => (...b) => f(...a, ...b);

export const goHome = history => history.push("/");

export const setUpMediaQuery = (ctx, callback, query) => {
  const targetWindow = ctx.props.targetWindow || window;
  // get the matchMedia function
  ctx.mediaQueryList = targetWindow.matchMedia(query);
  // listen to updates
  ctx.mediaQueryList.addListener(callback);
  // are we matching?
  return callback();
};
