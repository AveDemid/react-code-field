import { getNextFocusedFieldIdx } from "./../";

describe("It should get correct next focused field idx", () => {
  test("when the offset is positive and less than the last index", () => {
    const result = getNextFocusedFieldIdx(0, 1, 5);

    expect(result).toBe(1);
  });

  test("when the offset is positive and greater than the last index", () => {
    const result = getNextFocusedFieldIdx(0, 6, 5);

    expect(result).toBe(5);
  });

  test("when the offset is negative and start position minus offset greater than zero", () => {
    const result = getNextFocusedFieldIdx(3, -1, 5);

    expect(result).toBe(2);
  });

  test("when the offset is negative and start position minus offset less then zero", () => {
    const result = getNextFocusedFieldIdx(3, -10, 5);

    expect(result).toBe(0);
  });
});
