// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IReactCodeField {
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
