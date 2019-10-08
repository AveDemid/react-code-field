// prettier-ignore
export const mergeArrays = (arr1: string[], arr2: string[], offset: number) =>
  arr1.map((oldValue, idx) =>
    idx >= offset && arr2[idx - offset]
      ? arr2[idx - offset]
      : oldValue
  );

export const getNextFocusedFieldIdx = (
  startPosition: number,
  offset: number,
  lastIndex: number
) => {
  if (startPosition + offset < 0) {
    return 0;
  }

  if (startPosition + offset < lastIndex) {
    return startPosition + offset;
  }

  return lastIndex;
};

export const changeValueInArr = (arr: string[], newValue: string, idx: number) => {
  if (idx < 0 || idx > arr.length - 1) {
    return [...arr];
  }

  return Object.assign([...arr], { [idx]: newValue });
};

export const getFilteredValue = (list: string[], listBannedChars?: string[]) => {
  let filteredValue = [...list];

  if (listBannedChars) {
    filteredValue = filteredValue.filter(char => !listBannedChars.includes(char));
  }

  return filteredValue;
};
