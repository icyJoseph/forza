import React from "react";
import { shallow } from "enzyme";
import Emoji, { labelSymbolSelector } from "../";

const lookUpTable = [
  { symbol: "🥇", label: "1st" },
  { symbol: "🥈", label: "2nd" },
  { symbol: "🥉", label: "3rd" },
  { symbol: "⚽️", label: "Best" },
  { symbol: "✔️", label: "Yes" },
  { symbol: "❌", label: "No" },
  { symbol: "", label: "" }
];

const options = [1, 2, 3, "ball", "Yes", "No", ""];

describe("Emoji", () => {
  const emoji = shallow(<Emoji place={1} />);
  it("renders", () => {
    expect(emoji.text()).toEqual("🥇");
  });
});

describe("labelSymbolSelector", () => {
  it("returns the correct emoji", () => {
    const expected = options.map(labelSymbolSelector);
    expect(expected).toEqual(lookUpTable);
  });
});
