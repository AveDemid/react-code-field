export interface IReactCodeField {
  fields: number;
  type?: "text" | "number" | "password" | "phone";
  initialValue?: string;
  className?: string;
  inputClassName?: string;
  listBannedChars?: string[];
  forceUpperCase?: boolean;
  onChange?(s: string): void;
  onLastChange?(): void;
}
