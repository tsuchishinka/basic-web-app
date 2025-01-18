import { ReactNode } from "react";
import styles from "./index.module.scss";

const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return <div className={styles["default-layout"]}>{children}</div>;
};

export { DefaultLayout };
