import podiumSorter from "../utils";

const predictions = [
  { team: "A", place: 1 },
  { team: "B", place: 2 },
  { team: "C", place: 3 }
];

describe("it sorts as expected", () => {
  it("sorts when matches is false, narrow screen", () => {
    expect(podiumSorter(false, predictions)).toEqual(predictions);
  });
  it("sorts when matches is true, wide screen", () => {
    const expected = [
      { team: "B", place: 2 },
      { team: "A", place: 1 },
      { team: "C", place: 3 }
    ];
    expect(podiumSorter(true, predictions)).toEqual(expected);
  });
});
