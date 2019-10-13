import { mergeArrays } from "./../";

describe("It should merge the arrays correctly", () => {
  const arr1 = ["h", "e", "l", "l", "o"];
  const arr2 = ["w", "o", "r", "l", "d"];

  test("with 0 offset", () => {
    const expected = ["w", "o", "r", "l", "d"];
    const result = mergeArrays(arr1, arr2, 0);

    expect(result).toStrictEqual(expected);
  });

  test("with 3 offset", () => {
    const expected = ["h", "e", "l", "w", "o"];
    const result = mergeArrays(arr1, arr2, 3);

    expect(result).toStrictEqual(expected);
  });

  test("with -3 offset", () => {
    const expected = ["l", "d", "l", "l", "o"];
    const result = mergeArrays(arr1, arr2, -3);

    expect(result).toStrictEqual(expected);
  });

  test("with 999 offset", () => {
    const expected = ["h", "e", "l", "l", "o"];
    const result = mergeArrays(arr1, arr2, 999);

    expect(result).toStrictEqual(expected);
  });

  test("with -999 offset", () => {
    const expected = ["h", "e", "l", "l", "o"];
    const result = mergeArrays(arr1, arr2, -999);

    expect(result).toStrictEqual(expected);
  });
});
