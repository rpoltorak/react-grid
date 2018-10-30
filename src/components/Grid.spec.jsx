import React from "react";
import { mount, shallow } from "enzyme";

import Grid from "./Grid";
import GridHeader from "./GridHeader";
import GridRow from "./GridRow";
import GridCell from "./GridCell";

const exampleData = {
  headers: ["Firstname", "Lastname", "Age"],
  data: [
    ["John", "Doe", 24],
    ["Jan", "Kowalski", 32],
    ["Jose", "Gonzalez", 37],
  ],
};

describe("Grid Component", () => {
  test("should render correctly when passed props", () => {
    const grid = shallow(
      <Grid headers={exampleData.headers} data={exampleData.data} />,
    );

    expect(grid.find(GridHeader).exists()).toBe(true);
    expect(grid.find(GridRow).length).toBe(exampleData.data.length);
    expect(grid.find("button").exists()).toBe(true);
  });

  test("should render correctly with default props", () => {
    const grid = shallow(
      <Grid />,
    );

    expect(grid.find(GridHeader).exists()).toBe(true);
    expect(grid.find(GridRow).exists()).toBe(false);
    expect(grid.find("button").exists()).toBe(true);
  });

  test("should add new row after click on the plus button", () => {
    const grid = mount(
      <Grid headers={exampleData.headers} data={exampleData.data} />,
    );

    const expectedRows = exampleData.data.length + 1;

    const spy = jest.spyOn(grid.instance(), "handleRowInsert");

    grid.instance().forceUpdate();

    grid.find("#add-row").simulate("click");

    expect(spy).toHaveBeenCalled();
    expect(grid.state().data.length).toBe(expectedRows);
    expect(grid.state().data).toEqual([
      ["John", "Doe", 24],
      ["Jan", "Kowalski", 32],
      ["Jose", "Gonzalez", 37],
      ["", "", ""],
    ]);
    expect(grid.state().headers.length).toBe(exampleData.headers.length);
    expect(grid.find(GridRow).length).toBe(expectedRows);
  });

  test("should remove a row after click on the delete button", () => {
    const grid = mount(
      <Grid headers={exampleData.headers} data={exampleData.data} />,
    );

    const spy = jest.spyOn(grid.instance(), "handleRowDelete");

    grid.instance().forceUpdate();

    grid.find(".grid__cell--remove").first().simulate("click");

    const expectedRows = exampleData.data.length - 1;

    expect(spy).toHaveBeenCalled();
    expect(grid.state().data.length).toBe(expectedRows);
    expect(grid.state().data).toEqual([
      ["Jan", "Kowalski", 32],
      ["Jose", "Gonzalez", 37],
    ]);
    expect(grid.state().headers.length).toBe(exampleData.headers.length);
    expect(grid.find(GridRow).length).toBe(expectedRows);
  });

  test("should add new column after click on the plus button", () => {
    const grid = mount(
      <Grid headers={exampleData.headers} data={exampleData.data} />,
    );

    const spy = jest.spyOn(grid.instance(), "handleColumnInsert");

    grid.instance().forceUpdate();

    grid.find("#add-column").simulate("click");

    const expectedColumns = exampleData.headers.length + 1;
    const expectedRows = exampleData.data.length + 1;

    expect(grid.state().data.length).toBe(exampleData.data.length);

    expect(spy).toHaveBeenCalled();
    expect(grid.state().headers.length).toBe(expectedColumns);
    expect(grid.state().headers).toEqual(["Firstname", "Lastname", "Age", ""]);
    expect(grid.state().data).toEqual([
      ["John", "Doe", 24, ""],
      ["Jan", "Kowalski", 32, ""],
      ["Jose", "Gonzalez", 37, ""],
    ]);
    expect(grid.find(GridCell).length).toBe(expectedColumns * expectedRows);
  });

  test("should remove existing column after click on the delete button", () => {
    const grid = mount(
      <Grid headers={exampleData.headers} data={exampleData.data} />,
    );

    const spy = jest.spyOn(grid.instance(), "handleColumnDelete");

    grid.instance().forceUpdate();

    grid.find("#remove-column").first().simulate("click");

    const expectedColumns = exampleData.headers.length - 1;

    expect(spy).toHaveBeenCalled();
    expect(grid.state().data.length).toBe(exampleData.data.length);
    expect(grid.state().headers.length).toBe(expectedColumns);
    expect(grid.state().headers).toEqual(["Lastname", "Age"]);
    expect(grid.state().data).toEqual([
      ["Doe", 24],
      ["Kowalski", 32],
      ["Gonzalez", 37],
    ]);
    expect(grid.find(GridCell).length).toBe(expectedColumns * (exampleData.data.length + 1));
  });
});
