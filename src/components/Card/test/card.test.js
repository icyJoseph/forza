import React from "react";
import { shallow } from "enzyme";
import { CardWrap, Wrap, Card } from "../";

describe("CardWrap", () => {
  const wrapperWithProps = shallow(<CardWrap height={100} />);
  const wrapper = shallow(<CardWrap />);

  it("renders", () => {
    expect(wrapper).toBeTruthy();
  });
  it("gets auto height", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
  it("gets defined height", () => {
    expect(wrapperWithProps.html()).toMatchSnapshot();
  });
});

describe("Wrap", () => {
  const props = {
    title: 0,
    index: 0,
    highlight: -1
  };
  const otherProps = {
    title: 1,
    index: 0,
    highlight: 1
  };
  const wrapper = shallow(<Wrap {...props} />);
  const wrapper2 = shallow(<Wrap {...otherProps} />);
  it("gets fontSize 14pt and Color dodgerblue", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("gets fontSize 12pt and Color black", () => {
    expect(wrapper2).toMatchSnapshot();
  });
});

describe("Card", () => {
  const children = [<div>hi</div>, <div>hi</div>];
  const props = {
    handler: jest.fn(),
    id: "aa",
    current: "aa"
  };
  const wrapper = shallow(<Card {...props} children={children} />);
  it("renders two children", () => {
    expect(wrapper.children()).toHaveLength(2);
  });
  it("uses the handler", () => {
    wrapper.simulate("click");
    expect(props.handler).toHaveBeenCalled();
  });
  it("uses the correct elevation for id === current", () => {
    expect(wrapper.props()).toHaveProperty("elevation", 24);
  });
  it("uses the correct elevation for id!== current", () => {
    const otherProps = {
      ...props,
      current: "aaaa"
    };
    const wrapper2 = shallow(<Card {...otherProps} children={children} />);
    expect(wrapper2.props()).toHaveProperty("elevation", 3);
  });
});
