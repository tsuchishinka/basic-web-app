import { ComponentData } from "../parser/ComponentData";

type TreeNode = {
  name: string;
  children: TreeNode[];
};

const searchNode = (
  componentTree: TreeNode,
  name: string
): TreeNode | undefined => {
  if (componentTree.name === name) {
    return componentTree;
  }

  for (const child of componentTree.children) {
    const result = searchNode(child, name);
    if (result) {
      return result;
    }
  }

  return undefined;
};

/**
 * 正しい親子関係のコンポーネントツリーを生成する
 * @param data パースしたコンポーネントデータ
 */
const createComponentTree = (components: ComponentData[]): TreeNode => {
  const componentTree: TreeNode = {
    name: "root",
    children: [],
  };

  for (const component of components) {
    if (component.children.length === 0) {
      continue;
    }

    // 新しいノードの作成
    const newNode: TreeNode = {
      name: component.name,
      children: component.children.map((child) => {
        return {
          name: child,
          children: [],
        };
      }),
    };

    // Rootに子ノードがあれば移動する
    for (const newChild of newNode.children) {
      const idx = componentTree.children.findIndex(
        (child) => newChild.name === child.name
      );
      if (idx !== -1) {
        newNode.children = componentTree.children[idx].children;
        componentTree.children.splice(idx, 1);
      }
    }

    // ノードを探索する
    const node = searchNode(componentTree, component.name);
    if (node) {
      // nodeが見つかれば子供を更新する
      node.children = newNode.children;
    } else {
      // nodeが見つからなければrootに置く
      componentTree.children.push(newNode);
    }
  }
  return componentTree;
};

export { createComponentTree };
export type { TreeNode };
