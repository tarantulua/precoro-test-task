export const ButtonVariant = {
  DEFAULT: "default",
  CLEAR: "clear",
} as const;

export type ButtonVariant = (typeof ButtonVariant)[keyof typeof ButtonVariant];

export const ButtonShape = {
  DEFAULT: "default",
  ROUNDED: "rounded",
  SQUARE: "square",
};

export type ButtonShape = (typeof ButtonShape)[keyof typeof ButtonShape];

export interface ToastMessage {
  id: string;
  title?: string;
  text?: string;
  type?: "error" | "success";
  duration?: number;
}
