import { execSync } from "child_process";
import fs, { renameSync } from "fs";
import { ComponentData } from "../parser/ComponentData";
import { mkdir } from "../utils/mkdir";
import { createComponentTree, TreeNode } from "./createComponentTree";
import { getComponentCode } from "./getComponentCode";
import { getScssCode } from "./getScssCode";

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

const generateComponent = async (
  destPath: string,
  componentList: ComponentData[]
) => {
  const componentTree = createComponentTree(componentList);
  const rootPath = `${destPath}/${componentTree.children[0].name}`;

  generateFromTree(componentTree, componentList, destPath);
  if (fs.existsSync(`${destPath}/view`)) {
    execSync(`rm -r -f ${destPath}/view`);
  }
  await new Promise((resolve) => setTimeout(resolve, 1000));

  renameSync(
    `${destPath}/${componentTree.children[0].name}`,
    `${destPath}/view`
  );
};

export { generateComponent };
