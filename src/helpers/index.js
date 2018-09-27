import { homepage } from "../constants";

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

export const handleShare = (leagueName, predictions, topScorer) => {
  // if we don't have the data, don't do anything
  // if we do, but no navigator share, don't do anything
  // return a promise
  return (
    predictions[1] &&
    topScorer &&
    window.navigator.share &&
    window.navigator.share({
      text: `${predictions[1].teamName} will win the ${leagueName}, with ${
        topScorer.playerName
      } as top scorer`,
      title: `My ${leagueName} Predictions`,
      url: `${homepage}`
    })
  );
};

export const shouldFetch = expiry => {
  const now = new Date();
  const lastSave = new Date(expiry || now.getTime() - 1000);

  return now > lastSave;
};

export const addExpiry = allLeagues => {
  const now = new Date();
  const inOneHour = new Date(now.getTime() + 60 * 60 * 1000);
  return { allLeagues, expiry: inOneHour };
};
