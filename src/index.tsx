import React, { useState, useRef, useEffect } from "react";

const BACKSPACE_KEY = 8;
const TAB_KEY = 9;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const E_KEY = 69;

interface ReactCodeFieldProps {
  fields: number;
  onChange(s: string): void;
  inputType: "text" | "password" | "number";
  listBannedChars: string[];
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

export const ReactCodeField = ({
  fields,
  onChange,
  inputType,
  listBannedChars
}: ReactCodeFieldProps) => {
  const fieldRefs = useRef<HTMLInputElement[]>([]);

  const [fieldValues, setFieldValues] = useState<string[]>(
    Array(fields).fill("")
  );

  const [focusedFieldIdx, setFocusedFieldIdx] = useState<number>(0);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const idx = Number(event.target.dataset.idx);
    let handledValue = event.target.value.split("");

    if (inputType === "number") {
      handledValue = handledValue.filter(element => {
        return typeof +element === "number" && isFinite(+element);
      });
    }

    if (listBannedChars) {
      handledValue = handledValue.filter(element => {
        return !listBannedChars.includes(element);
      });
    }

    const nextFieldValues = mergeArrays(fieldValues, handledValue, idx);
    const nextFocusedFieldIdx = getNextFocusedFieldIndex(
      idx,
      handledValue.length,
      fields - 1
    );

    setFieldValues(nextFieldValues);
    setFocusedFieldIdx(nextFocusedFieldIdx);
  };

  const handleBackspaceKeyDown = (value: string, idx: number) => {
    const nextValue = changeValueInArr(fieldValues, "", idx);
    const nextFocusedFieldIdx = getNextFocusedFieldIndex(idx, -1, fields - 1);

    value ? setFieldValues(nextValue) : setFocusedFieldIdx(nextFocusedFieldIdx);
  };

  const handleLeftKeyDown = (idx: number) => {
    const nextFocusedFieldIdx = getNextFocusedFieldIndex(idx, -1, fields - 1);

    setFocusedFieldIdx(nextFocusedFieldIdx);
  };

  const handleRightKeyDown = (idx: number) => {
    const nextFocusedFieldIdx = getNextFocusedFieldIndex(idx, 1, fields - 1);

    setFocusedFieldIdx(nextFocusedFieldIdx);
  };

  const handleTabKeyDown = (idx: number, shiftKey: boolean) => {
    let nextFocusedFieldIdx;

    if (shiftKey) {
      nextFocusedFieldIdx = getNextFocusedFieldIndex(idx, -1, fields - 1);
    } else {
      nextFocusedFieldIdx = getNextFocusedFieldIndex(idx, 1, fields - 1);
    }

    setFocusedFieldIdx(nextFocusedFieldIdx);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const keyCode = event.keyCode;
    const value = event.currentTarget.value;
    const idx = Number(event.currentTarget.dataset.idx);

    switch (keyCode) {
      case BACKSPACE_KEY:
        event.preventDefault();
        handleBackspaceKeyDown(value, idx);
        break;
      case LEFT_ARROW:
        event.preventDefault();
        handleLeftKeyDown(idx);
        break;
      case RIGHT_ARROW:
        event.preventDefault();
        handleRightKeyDown(idx);
        break;
      case TAB_KEY:
        event.preventDefault();
        handleTabKeyDown(idx, event.shiftKey);
        break;
      case E_KEY:
        if (inputType === "number") {
          event.preventDefault();
        }
    }
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.preventDefault();
    const idx = Number(event.target.dataset.idx);

    if (idx === focusedFieldIdx) {
      event.target.select();
    } else {
      setFocusedFieldIdx(idx);
    }
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();

    const idx = Number(event.currentTarget.dataset.idx);

    if (idx === focusedFieldIdx) {
      event.currentTarget.select();
    } else {
      setFocusedFieldIdx(idx);
    }
  };

  useEffect(() => {
    if (fieldRefs.current[focusedFieldIdx]) {
      fieldRefs.current[focusedFieldIdx].focus();
      fieldRefs.current[focusedFieldIdx].select();
    }
  }, [focusedFieldIdx]);

  useEffect(() => {
    if (onChange) {
      onChange(fieldValues.join(""));
    }
  }, [fieldValues, onChange]);

  return (
    <div style={{ display: "flex" }}>
      {fieldValues.map((value, idx) => (
        <input
          key={idx}
          data-idx={idx}
          type={inputType}
          value={value}
          ref={node => {
            node && fieldRefs && fieldRefs.current.push(node);
          }}
          onInput={handleInput}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          onMouseDown={handleMouseDown}
          onChange={e => e.preventDefault()}
          style={{
            width: "30px",
            height: "30px",
            textAlign: "center",
            fontSize: "20px"
          }}
        />
      ))}
    </div>
  );
};
