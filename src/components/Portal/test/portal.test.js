import React from "react";
import { shallow, mount } from "enzyme";
import { Portal, wrap, elementSelector } from "../";
import { FLOATING_BOTTOM_MENU } from "../../../constants";

const Comp = () => <div>Hi</div>;

describe("utils", () => {
  it("wraps", () => {
    const wrapped = shallow(wrap(true, Comp, {}));
    expect(
      wrapped
        .children()
        .at(0)
        .find(Comp)
    ).toHaveLength(1);
  });
  it("does not wrap", () => {
    const unWrapped = shallow(wrap(false, Comp, {}));
    expect(unWrapped.find("div")).toHaveLength(1);
  });
  it("selects hook element", () => {
    expect(elementSelector(true, "hook")).toEqual("hook");
  });
  it("selects default element", () => {
    expect(elementSelector(false, "hook")).toEqual(FLOATING_BOTTOM_MENU);
  });
});

describe("Portal", () => {
  const props = {
    componentProps: {},
    Component: () => <div>Hi</div>,
    hook: "id"
  };
  const elem = document.createElement("div");
  elem.setAttribute("id", FLOATING_BOTTOM_MENU);

  document.body.appendChild(elem);
  const wrapper = mount(<Portal {...props} />);
  it("renders", () => {
    expect(wrapper).toBeTruthy();
  });
  it("removes listener on unmount", () => {
    const spy = jest.fn();
    wrapper.instance().mediaQueryList.removeListener = spy;
    wrapper.instance().componentWillUnmount();
    expect(spy).toHaveBeenCalled();
  });
});
