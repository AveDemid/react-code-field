import React, { useState, useRef, useEffect } from "react";

const BACKSPACE_KEY = 8;

interface ReactCodeFieldProps {
  fields: number;
}

// prettier-ignore
export const mergeArrays = (arr1: string[], arr2: string[], offset: number) =>
  arr1.map((oldValue, idx) =>
    idx >= offset && arr2[idx - offset]
      ? arr2[idx - offset]
      : oldValue
  );

export const getNextFocusedFieldIndex = (
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

export const changeValueInArr = (
  arr: string[],
  newValue: string,
  idx: number
) => {
  return Object.assign([...arr], { [idx]: newValue });
};

export const ReactCodeField = ({ fields }: ReactCodeFieldProps) => {
  // Input references
  const fieldRefs = useRef<HTMLInputElement[]>([]);

  //  Array of values
  const [fieldValues, setFieldValues] = useState<string[]>(
    Array(fields).fill("")
  );

  // Focused input
  const [focusedFieldIdx, setFocusedFieldIdx] = useState<number>(0);

  // Handle Change Value
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const idx = Number(event.target.dataset.idx);
    const handledValue = event.target.value.split("");
    const nextFieldValues = mergeArrays(fieldValues, handledValue, idx);
    const nextFocusedFieldIdx = getNextFocusedFieldIndex(
      idx,
      handledValue.length,
      fields - 1
    );

    setFieldValues(nextFieldValues);
    setFocusedFieldIdx(nextFocusedFieldIdx);
  };

  // Handle backspace keydown
  const handleBackspaceKeyDown = (value: string, idx: number) => {
    const nextValue = changeValueInArr(fieldValues, "", idx);
    const nextFocusedFieldIdx = getNextFocusedFieldIndex(idx, -1, fields - 1);

    value ? setFieldValues(nextValue) : setFocusedFieldIdx(nextFocusedFieldIdx);
  };

  // Handle keydown
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const keyCode = event.keyCode;
    const value = event.currentTarget.value;
    const idx = Number(event.currentTarget.dataset.idx);

    switch (keyCode) {
      case BACKSPACE_KEY:
        event.preventDefault();
        handleBackspaceKeyDown(value, idx);
        break;
    }
  };

  // Focus Control
  useEffect(() => {
    fieldRefs.current[focusedFieldIdx].focus();
  }, [focusedFieldIdx]);

  return (
    <div>
      {fieldValues.map((value, idx) => (
        <input
          type="text"
          key={idx}
          data-idx={idx}
          value={value}
          onKeyDown={handleKeyDown}
          ref={node => {
            fieldRefs && node && fieldRefs.current.push(node);
          }}
          onChange={handleChange}
        />
      ))}
    </div>
  );
};
