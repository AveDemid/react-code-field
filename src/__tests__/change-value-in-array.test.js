import { changeValueInArr } from "../utils";

describe("It should correct pure change value in array by idx", () => {
  test("when the index enters the length of the array", () => {
    const result = changeValueInArr(["h", "e", "l", "l", "o"], "x", 2);

    expect(result).toStrictEqual(["h", "e", "x", "l", "o"]);
  });

  test("when a positive index is not included in the length of the array", () => {
    const result = changeValueInArr(["h", "e", "l", "l", "o"], "x", 999);

    expect(result).toStrictEqual(["h", "e", "l", "l", "o"]);
  });

  test("when a negative index is not included in the length of the array", () => {
    const result = changeValueInArr(["h", "e", "l", "l", "o"], "x", -999);

    expect(result).toStrictEqual(["h", "e", "l", "l", "o"]);
  });
});
