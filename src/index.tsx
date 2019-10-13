import React, { useState, useRef, useEffect, useLayoutEffect } from "react";

const KEYS = {
  BACKSPACE: 8,
  TAB: 9,
  LEFT_ARROW: 37,
  RIGHT_ARROW: 39,
  E: 69,
  PLUS: 187,
  COMMA: 188,
  MINUS: 189,
  POINT: 190
};

export const mergeArrays = (arr1: string[], arr2: string[], offset: number) =>
  arr1.map((oldValue, idx) =>
    idx >= offset && arr2[idx - offset] ? arr2[idx - offset] : oldValue
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

export const getFormattedValue = (
  list: string[],
  listBannedChars?: string[],
  isForceUpperCase?: boolean
) => {
  let filteredValue = [...list];

  if (listBannedChars) {
    filteredValue = filteredValue.filter(char => !listBannedChars.includes(char));
  }

  if (isForceUpperCase) {
    filteredValue = filteredValue.map(char => char.toUpperCase());
  }

  return filteredValue;
};

interface IReactCodeField {
  fields: number;
  type?: "text" | "number" | "password" | "phone";
  initialValue?: string;
  className?: string;
  inputClassName?: string;
  listBannedChars?: string[];
  forceUpperCase?: boolean;
  autoFocus?: boolean;
  onChange?(s: string): void;
  onLastChange?(): void;
}

export const ReactCodeField = ({
  fields,
  initialValue,
  type,
  listBannedChars,
  className,
  inputClassName,
  forceUpperCase,
  autoFocus,
  onChange,
  onLastChange
}: IReactCodeField) => {
  const fieldRefs = useRef<HTMLInputElement[]>([]);
  const [fieldValues, setFieldValues] = useState<string[]>(Array(fields).fill(""));
  const [focusedFieldIdx, setFocusedFieldIdx] = useState<number>(0);
  const [isComponentInit, setIsComponentInit] = useState<boolean>(false);
  const [isComponentTouched, setIsComponentTouched] = useState<boolean>(false);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const idx = Number(event.target.dataset.idx);
    const value = event.target.value.split("");

    const filteredValue = getFormattedValue(value, listBannedChars, forceUpperCase);
    const nextFieldValues = mergeArrays(fieldValues, filteredValue, idx);
    const nextFocusedFieldIdx = getNextFocusedFieldIdx(idx, filteredValue.length, fields - 1);

    if (nextFieldValues[fields - 1] !== "" && onLastChange) {
      onLastChange();
    }

    setFieldValues(nextFieldValues);
    setFocusedFieldIdx(nextFocusedFieldIdx);
    setIsComponentTouched(true);
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

  useLayoutEffect(() => {
    if (initialValue && !isComponentInit) {
      const filteredValue = getFormattedValue(
        initialValue.split(""),
        listBannedChars,
        forceUpperCase
      );
      const nextFieldValues = mergeArrays(fieldValues, filteredValue, 0);
      const nextFocusedFieldIdx = getNextFocusedFieldIdx(0, filteredValue.length, fields - 1);

      setFieldValues(nextFieldValues);

      if (autoFocus) {
        setFocusedFieldIdx(nextFocusedFieldIdx);
      }

      setIsComponentInit(true);
    }
  }, [
    isComponentInit,
    fieldValues,
    fields,
    listBannedChars,
    initialValue,
    forceUpperCase,
    autoFocus
  ]);

  useLayoutEffect(() => {
    if (!autoFocus && !isComponentTouched) {
      return;
    }

    if (fieldRefs.current[focusedFieldIdx]) {
      fieldRefs.current[focusedFieldIdx].focus();
      fieldRefs.current[focusedFieldIdx].select();
    }
  }, [autoFocus, focusedFieldIdx, isComponentTouched]);

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
