import fs from "fs";
import { ComponentData } from "../parser/ComponentData";
import { mkdir } from "../../utils/mkdir";
import { appendAncestors } from "./createComponentTree";
import { makeComponentCode } from "./code/component/makeComponentCode";
import { makeStorybookCode } from "./code/storybook/makeStorybookCode";

type AppType = "ui" | "app";

const generateComponent = (
  destPath: string,
  componentList: ComponentData[],
  appType: AppType,
) => {
  const newComponentList = appendAncestors(componentList);
  for (const component of newComponentList) {
    const dirPath = `${destPath}/${component.ancestors.length > 0 ? component.ancestors.reverse().join("/") + "/" : ""}${component.name}`;
    mkdir(dirPath);

    const componentCode = makeComponentCode(component);
    fs.writeFileSync(`${dirPath}/index.tsx`, componentCode);
    if (component.ancestors.length === 0 && appType === "ui") {
      const storybookCode = makeStorybookCode(component);
      fs.writeFileSync(`${dirPath}/index.stories.tsx`, storybookCode);
    }
  }
};

export { generateComponent };
export type { AppType };
