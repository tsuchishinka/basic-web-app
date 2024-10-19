import fs from "fs";
import { mkdir } from "../../utils/mkdir";
import { ComponentData } from "../parser/ComponentData";
import { appendAncestors } from "./appendAncestors";
import { makeComponentCode } from "./code/component/makeComponentCode";
import { makeStorybookCode } from "./code/storybook/makeStorybookCode";
import { createComponentTree } from "./createComponentTree";

type AppType = "ui" | "app";

type ShortTree = {
  name: string;
  children: ShortTree[];
};

const pickUpNameAndChildOnly = (componentTree: ShortTree[]): ShortTree[] => {
  return componentTree.map(({ name, children }) => {
    return {
      name,
      children: pickUpNameAndChildOnly(children),
    };
  });
};

const generateComponent = (
  destPath: string,
  componentList: ComponentData[],
  appType: AppType
) => {
  const newComponentList = appendAncestors(componentList);
  const componentTree = createComponentTree(componentList);
  console.log(
    `compoentnTree: ${JSON.stringify(pickUpNameAndChildOnly(componentTree))}`
  );
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
