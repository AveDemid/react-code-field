export interface IReactCodeField {
  fields: number;
  type?: "text" | "number" | "password" | "phone";
  value?: string;
  name?: string;
  listBannedChars?: string[];
  className?: string;
  inputClassName?: string;
  onChange?(s: string): void;
  onLastChange?(): void;
}
