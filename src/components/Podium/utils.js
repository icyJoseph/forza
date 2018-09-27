const wideScreen = [2, 1, 3];
const narrowScreen = [1, 2, 3];

export function sortPodium(match, place) {
  return match ? wideScreen.indexOf(place) : narrowScreen.indexOf(place);
}

const podiumSorter = (matches, predictions) => {
  return Object.keys(predictions)
    .map(pr => ({
      ...predictions[pr]
    }))
    .sort(
      (a, b) => sortPodium(matches, a.place) - sortPodium(matches, b.place)
    );
};

export default podiumSorter;
