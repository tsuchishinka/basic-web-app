import fs from "fs";
import { ComponentData } from "../parser/ComponentData";
import { mkdir } from "../utils/mkdir";
import { getComponentCode } from "./component/getComponentCode";
import { createComponentTree, TreeNode } from "./createComponentTree";
import { getScssCode } from "./scss/getScssCode";

const generateFromTree = (
  treeNode: TreeNode,
  components: ComponentData[],
  destPath: string
) => {
  if (treeNode.children.length === 0) {
    return;
  }
  for (const childNode of treeNode.children) {
    const childComponent = components.find(
      (component) => component.name === childNode.name
    );
    if (childComponent) {
      const dirPath = `${destPath}/${childComponent.name}`;
      mkdir(dirPath);

      const componentCode = getComponentCode(childComponent);
      fs.writeFileSync(`${dirPath}/index.tsx`, componentCode);

      const scssCode = getScssCode(childComponent);
      fs.writeFileSync(`${dirPath}/index.module.scss`, scssCode);
    }
    if (childNode.children.length > 0) {
      generateFromTree(childNode, components, `${destPath}/${childNode.name}`);
    }
  }
};

const generateComponent = (
  destPath: string,
  componentList: ComponentData[]
) => {
  const componentTree = createComponentTree(componentList);
  generateFromTree(componentTree, componentList, destPath);
};

export { generateComponent };
