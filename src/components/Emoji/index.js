import React from "react";

const labelSymbolSelector = place => {
  switch (place) {
    case 1:
      return { symbol: "🥇", label: "1st" };
    case 2:
      return { symbol: "🥈", label: "2nd" };
    case 3:
      return { symbol: "🥉", label: "3rd" };
    case "ball":
      return { symbol: "⚽️", label: "Best" };
    case "Yes":
      return { symbol: "✔️", label: "Yes" };
    case "No":
      return { symbol: "❌", label: "No" };
    default:
      return { symbol: "", label: "" };
  }
};

export const Emoji = ({ place }) => {
  const { label, symbol } = labelSymbolSelector(place);
  return (
    <span
      className="emoji"
      role="img"
      aria-label={label ? label : ""}
      aria-hidden={label ? "false" : "true"}
      style={{ fontSize: "16pt" }}
    >
      {symbol}
    </span>
  );
};
export default Emoji;
