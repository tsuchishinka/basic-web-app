export type Styles = {
  button: string;
  "button-large": string;
  "button-medium": string;
  "button-primary": string;
  "button-primary-blue": string;
  "button-primary-gray": string;
  "button-primary-green": string;
  "button-primary-red": string;
  "button-secondary": string;
  "button-secondary-blue": string;
  "button-secondary-gray": string;
  "button-secondary-green": string;
  "button-secondary-red": string;
  "button-small": string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
