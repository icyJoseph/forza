const wideScreen = [2, 1, 3];
const narrowScreen = [1, 2, 3];

export function sortPodium(match, place) {
  switch (match) {
    case true:
      return wideScreen.indexOf(place);
    case false:
      return narrowScreen.indexOf(place);
    default:
      return -1;
  }
}

const podiumSorter = (matches, predictions) =>
  predictions.sort(
    (a, b) => sortPodium(matches, a.place) - sortPodium(matches, b.place)
  );

export default podiumSorter;
