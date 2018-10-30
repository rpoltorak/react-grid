import React from "react";
import { mount, shallow } from "enzyme";

import GridCell from "./GridCell";

describe("GridCell Component", () => {
  test("should render correctly when passed props", () => {
    const value = "Jan";
    const position = { x: 5, y: 2 };

    const cell = shallow(
      <GridCell
        key={`cell_${position.x}_${position.y}`}
        value={value}
        onCellChange={() => {}}
        x={position.x}
        y={position.y}
      />
    );

    expect(cell.find(".grid__cell").text()).toEqual(value);
  });

  test("should render correctly when passed children", () => {
    const value = "Jan";
    const position = { x: 5, y: 2 };

    const cell = shallow(
      <GridCell
        key={`cell_${position.x}_${position.y}`}
        value={value}
        onCellChange={() => {}}
        x={position.x}
        y={position.y}
      >
        <div className="unique" />
      </GridCell>
    );

    expect(cell.contains(<div className="unique" />)).toEqual(true);
  });

  test("should render edition input when clicked", () => {
    const value = "Jan";
    const position = { x: 5, y: 2 };

    const cell = mount(
      <GridCell
        key={`cell_${position.x}_${position.y}`}
        value={value}
        onCellChange={() => {}}
        x={position.x}
        y={position.y}
      />
    );

    cell.find(".grid__cell").simulate("click");

    expect(cell.state().isEdited).toBe(true);
    expect(cell.find("input").exists()).toBe(true);
  });

  test("should change cell value and call save method", () => {
    const value = "Jan";
    const position = { x: 5, y: 2 };

    const cell = mount(
      <GridCell
        key={`cell_${position.x}_${position.y}`}
        value={value}
        onCellChange={() => {}}
        x={position.x}
        y={position.y}
      />
    );

    cell.find(".grid__cell").simulate("click");

    expect(cell.state().isEdited).toBe(true);

    const spy = jest.spyOn(cell.instance(), "save");
    const input = cell.find("input");

    input.simulate("keypress", { key: "a" });
    input.simulate("keypress", { key: "Enter" });

    expect(cell.state().isEdited).toBe(false);
    expect(spy).toHaveBeenCalled();
  });
});
