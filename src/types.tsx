export interface IReactCodeField {
  fields: number;
  type?: "text" | "number" | "password" | "phone";
  value?: string;
  className?: string;
  inputClassName?: string;
  listBannedChars?: string[];
  onChange?(s: string): void;
  onLastChange?(): void;
}
