import React from "react";
import { shallow } from "enzyme";
import CircularProgress from "@material-ui/core/CircularProgress";

import Loading from "../";

describe("Loading", () => {
  it("returns loading if past delay", () => {
    const wrap = shallow(<Loading pastDelay />);
    expect(wrap.children()).toHaveLength(1);
    expect(wrap.find(CircularProgress)).toHaveLength(1);
  });
  it("returns null if not past delay", () => {
    const wrap = shallow(<Loading pastDelay={false} />);
    expect(wrap.getElement()).toEqual(null);
    expect(wrap.isEmptyRender()).toEqual(true);
  });
  it("returns null when seen as a JS function", () => {
    const res = Loading({});
    expect(res).toEqual(null);
  });
});
