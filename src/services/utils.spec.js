import { removeByIndex, updateByIndex, generateCSV } from "./utils";

describe("Utils Service", () => {
  test("removeByIndex: removes specified element from an array", () => {
    const data = ["x", "y", "z"];

    expect(removeByIndex(data, 1)).toEqual(["x", "z"]);
    expect(removeByIndex(data)).toEqual(data);
    expect(removeByIndex(data, 4)).toEqual(data);
  });

  test("updateByIndex: updates specified element in array", () => {
    const data = ["x", "y", "z"];

    expect(updateByIndex(data, 1, "v")).toEqual(["x", "v", "z"]);

    try {
      expect(updateByIndex(data, 4, "v")).toThrow(
        new Error("Error: Expected index from 0 to 3 range"),
      );

      expect(updateByIndex([], 2, "v")).toThrow(
        new Error("Error: Specified array is empty"),
      );
    } catch (e) {
      // eslint-disable-line
    }
  });

  test("generateCSV: generates correct csv format", () => {
    const headers = ["firstname", "lastname", "age"];
    const data = [
      ["Jan", "Kowalski", "25"],
      ["John", "Doe", "32"],
      ["Jose", "Gonzalez", "37"],
    ];

    const expectedResult = "data:text/csv;charset=UTF-8,"
      + "firstname%2Clastname%2Cage%0A"
      + "Jan%2CKowalski%2C25%0A"
      + "John%2CDoe%2C32%0A"
      + "Jose%2CGonzalez%2C37";

    expect(generateCSV(headers, data)).toEqual(expectedResult);
  });
});
