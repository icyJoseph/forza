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

export function setUpMediaQuery(query) {
  const targetWindow = this.props.targetWindow || window;
  // get the matchMedia function
  this.mediaQueryList = targetWindow.matchMedia(query);
  // listen to updates
  this.mediaQueryList.addListener(this.updateMatches);
  // are we matching?
  return this.updateMatches();
}
