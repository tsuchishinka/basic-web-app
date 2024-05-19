export type Styles = {
  disabled: string;
  "text-input": string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
