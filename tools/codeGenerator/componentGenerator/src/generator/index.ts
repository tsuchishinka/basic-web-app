import { ComponentData } from "../parser/ComponentData";
import { mkdir } from "../utils/mkdir";
import fs from "fs";
import { getComponentDirPath, makeComponentTree } from "./componentTree";
import { getComponentCodeStr } from "./code";

const generate = (destPath: string, componentList: ComponentData[]) => {
  const componentTree = makeComponentTree(componentList);
  for (const componentNode of componentTree) {
    const componentDirPath = getComponentDirPath(destPath, componentNode);
    mkdir(componentDirPath);
    const componentCodeStr = getComponentCodeStr(componentNode.componentData);
    if (componentCodeStr === undefined) {
      return;
    }
    fs.writeFileSync(destPath, componentCodeStr);
  }
};

export { generate };
