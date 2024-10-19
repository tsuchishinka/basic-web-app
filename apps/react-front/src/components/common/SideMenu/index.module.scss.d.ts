export type Styles = {
  base: string;
  "side-bar": string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
