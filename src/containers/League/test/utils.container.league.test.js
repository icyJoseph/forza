import { toggler } from "../utils";

describe("toggler", () => {
  it("closes same id, with Predictions already open", () => {
    const prevState = {
      id: "myId",
      open: true
    };
    const id = "myId";
    const result = toggler(id, prevState);
    expect(result).toEqual({ open: false, id: null });
  });

  it("opens", () => {
    const prevState = {
      id: null,
      open: false
    };
    const id = "myId";
    const result = toggler(id, prevState);
    expect(result).toEqual({ open: true, id });
  });

  it("stays open when clicking other id", () => {
    const prevState = {
      id: "yourId",
      open: open
    };
    const id = "myId";
    const result = toggler(id, prevState);
    expect(result).toEqual({ open: true, id });
  });
});
