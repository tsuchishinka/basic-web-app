export type Styles = {
  "children-left": string;
  "error-message": string;
  "error-message-left": string;
  "input-wrapper-left": string;
  "input-wrapper-top": string;
  label: string;
  "label-left": string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
