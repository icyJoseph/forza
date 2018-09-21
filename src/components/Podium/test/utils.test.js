import podiumSorter from "../utils";

const predictions = [
  { team: "A", place: 1, position: "first" },
  { team: "B", place: 2, position: "second" },
  { team: "C", place: 3, position: "third" }
];

describe("it sorts as expected", () => {
  it("sorts when matches is false, narrow screen", () => {
    expect(podiumSorter(false, predictions)).toEqual(predictions);
  });
  it("sorts when matches is true, wide screen", () => {
    const expected = [
      { team: "B", place: 2, position: "second" },
      { team: "A", place: 1, position: "first" },
      { team: "C", place: 3, position: "third" }
    ];
    expect(podiumSorter(true, predictions)).toEqual(expected);
  });
});
