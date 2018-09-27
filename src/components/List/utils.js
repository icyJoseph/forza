import {
  PLAYERS,
  GOALS_LAST_SEASON,
  TEAM_GOALS_LAST_SEASON
} from "../../constants";

export const goalCriteria = type => {
  const key = type === PLAYERS ? GOALS_LAST_SEASON : TEAM_GOALS_LAST_SEASON;
  return (a, b) => b[key] - a[key];
};

export const sortList = (items, sorting, type) => {
  const copy = items.slice(0);
  return sorting ? copy.sort(goalCriteria(type)) : items;
};

export const shouldHighlight = (goals, threshold, index) =>
  goals > threshold ? [index] : [];
