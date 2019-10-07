export interface IReactCodeField {
  fields: number;
  onChange?(s: string): void;
  onLastChange?(): void;
  inputType?: "text" | "password" | "number";
  listBannedChars?: string[];
  className?: string;
  inputClassName?: string;
}
