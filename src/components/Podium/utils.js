const wideScreen = ["second", "first", "third"];
const narrowScreen = ["first", "second", "third"];

export function sortPodium(match, position) {
  switch (match) {
    case true:
      return wideScreen.indexOf(position);
    case false:
      return narrowScreen.indexOf(position);
    default:
      return -1;
  }
}

const podiumSorter = (matches, predictions) =>
  predictions.sort(
    (a, b) => sortPodium(matches, a.position) - sortPodium(matches, b.position)
  );

export default podiumSorter;
