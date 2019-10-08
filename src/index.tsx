import React, { useState, useRef, useEffect } from "react";

import { KEYS } from "./keys";
import { mergeArrays, getNextFocusedFieldIdx, changeValueInArr, getFilteredValue } from "./utils";
import { IReactCodeField } from "./types";

export const ReactCodeField = ({
  fields,
  onChange,
  onLastChange,
  type,
  listBannedChars,
  className,
  inputClassName
}: IReactCodeField) => {
  const fieldRefs = useRef<HTMLInputElement[]>([]);
  const [fieldValues, setFieldValues] = useState<string[]>(Array(fields).fill(""));
  const [focusedFieldIdx, setFocusedFieldIdx] = useState<number>(0);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const idx = Number(event.target.dataset.idx);
    const value = event.target.value.split("");

    const filteredValue = getFilteredValue(value, listBannedChars);
    const nextFieldValues = mergeArrays(fieldValues, filteredValue, idx);
    const nextFocusedFieldIdx = getNextFocusedFieldIdx(idx, filteredValue.length, fields - 1);

    if (nextFieldValues[fields - 1] !== "" && onLastChange) {
      onLastChange();
    }

    setFieldValues(nextFieldValues);
    setFocusedFieldIdx(nextFocusedFieldIdx);
  };

  const handleBackspaceKeyDown = (value: string, idx: number) => {
    const nextValue = changeValueInArr(fieldValues, "", idx);
    const nextFocusedFieldIdx = getNextFocusedFieldIdx(idx, -1, fields - 1);

    value ? setFieldValues(nextValue) : setFocusedFieldIdx(nextFocusedFieldIdx);
  };

  const handleLeftKeyDown = (idx: number) => {
    const nextFocusedFieldIdx = getNextFocusedFieldIdx(idx, -1, fields - 1);

    setFocusedFieldIdx(nextFocusedFieldIdx);
  };

  const handleRightKeyDown = (idx: number) => {
    const nextFocusedFieldIdx = getNextFocusedFieldIdx(idx, 1, fields - 1);

    setFocusedFieldIdx(nextFocusedFieldIdx);
  };

  const handleTabKeyDown = (idx: number, shiftKey: boolean) => {
    let nextFocusedFieldIdx;

    if (shiftKey) {
      nextFocusedFieldIdx = getNextFocusedFieldIdx(idx, -1, fields - 1);
    } else {
      nextFocusedFieldIdx = getNextFocusedFieldIdx(idx, 1, fields - 1);
    }

    setFocusedFieldIdx(nextFocusedFieldIdx);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const keyCode = event.keyCode;
    const value = event.currentTarget.value;
    const idx = Number(event.currentTarget.dataset.idx);

    switch (keyCode) {
      case KEYS.BACKSPACE:
        event.preventDefault();
        handleBackspaceKeyDown(value, idx);
        break;
      case KEYS.LEFT_ARROW:
        event.preventDefault();
        handleLeftKeyDown(idx);
        break;
      case KEYS.RIGHT_ARROW:
        event.preventDefault();
        handleRightKeyDown(idx);
        break;
      case KEYS.TAB:
        event.preventDefault();
        handleTabKeyDown(idx, event.shiftKey);
        break;
      case KEYS.PLUS:
      case KEYS.MINUS:
      case KEYS.COMMA:
      case KEYS.POINT:
      case KEYS.E:
        if (type === "number") {
          event.preventDefault();
        }
        break;
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
    <div className={className}>
      {fieldValues.map((value, idx) => (
        <input
          key={idx}
          data-idx={idx}
          type={type}
          value={value}
          ref={node => {
            node && fieldRefs && fieldRefs.current.push(node);
          }}
          onInput={handleInput}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          onMouseDown={handleMouseDown}
          onChange={e => e.preventDefault()}
          className={inputClassName}
        />
      ))}
    </div>
  );
};
