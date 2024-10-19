import fs from "fs";
import { mkdir } from "../../utils/mkdir";
import { ComponentData } from "../parser/ComponentData";
import { makeComponentCode } from "./code/component/makeComponentCode";
import { makeStorybookCode } from "./code/storybook/makeStorybookCode";
import { createComponentTree, TreeNode } from "./createComponentTree";

type ComponentCategory = "ui" | "page";

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
      const code = makeComponentCode(childComponent);
      const dirPath = `${destPath}/${childComponent.name}`;
      mkdir(dirPath);
      fs.writeFileSync(`${dirPath}/index.tsx`, code);
    }
    if (childNode.children.length > 0) {
      generateFromTree(childNode, components, `${destPath}/${childNode.name}`);
    }
  }
};

const generateComponent = (
  destPath: string,
  componentList: ComponentData[],
  category: ComponentCategory
) => {
  const componentTree = createComponentTree(componentList);
  generateFromTree(componentTree, componentList, destPath);

  if (category === "ui") {
    for (const rootChild of componentTree.children) {
      const component = componentList.find(
        (component) => component.name === rootChild.name
      );
      if (component) {
        const storybookCode = makeStorybookCode(component);
        fs.writeFileSync(
          `${destPath}/${rootChild.name}/index.stories.tsx`,
          storybookCode
        );
      }
    }
  }
};

export { generateComponent };
export type { ComponentCategory };
