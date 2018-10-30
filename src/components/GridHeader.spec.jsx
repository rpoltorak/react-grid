import React from "react";
import { shallow } from "enzyme";

import GridHeader from "./GridHeader";
import GridCell from "./GridCell";

const exampleHeaders = ["Firstname", "Lastname", "Age"];

describe("GridHeader Component", () => {
  test("should render correctly when passed props", () => {
    const header = shallow(
      <GridHeader
        headers={exampleHeaders}
        onHeaderChange={() => {}}
        onColumnDelete={() => {}}
        onColumnInsert={() => {}}
      />
    );

    expect(header.find(GridCell).length).toBe(exampleHeaders.length);
    expect(header.find("#add-column").exists()).toBe(true);
  });

  test("should react when props are changed", () => {
    const header = shallow(
      <GridHeader
        headers={exampleHeaders}
        onHeaderChange={() => {}}
        onColumnDelete={() => {}}
        onColumnInsert={() => {}}
      />
    );

    const newHeaders = [...exampleHeaders, "Salary"];

    header.setProps({headers: newHeaders});

    expect(header.find(GridCell).length).toBe(newHeaders.length);
  });
});
