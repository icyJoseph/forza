import { mapStateToProps } from "../";

describe("mapStateToProps", () => {
  it("maps", () => {
    const store = {
      predictions: {},
      sorting: false,
      leagues: {
        allLeagues: {}
      }
    };
    expect(mapStateToProps(store)).toEqual({
      predictions: {},
      sorting: false,
      allLeagues: {}
    });
  });
});
