import { ComponentData } from "../parser/ComponentData";

type ComponentTree = Omit<ComponentData, "children"> & {
  children: ComponentTree[];
};

const updateChildren = (
  children: ComponentTree[],
  rootChildren: ComponentTree[]
): ComponentTree[] => {
  return children.map((component) => {
    const tempChildren: ComponentTree[] = [];
    for (const child of component.children) {
      // childがrootChildrenから見つかれば自身の子階層に移動する
      const childIndex = rootChildren.findIndex(
        ({ name }) => child.name === name
      );
      if (childIndex !== -1) {
        tempChildren.push(rootChildren[childIndex]);
        rootChildren.splice(childIndex, 1);
      }
    }

    // childのさらに子供についても、rootChildrenから移動する
    const newChildren =
      tempChildren.length > 0 ? updateChildren(tempChildren, rootChildren) : [];

    return {
      ...component,
      children: newChildren,
    };
  });
};

/**
 * 正しい親子関係のコンポーネントツリーを生成する
 * @param data パースしたコンポーネントデータ
 */
const createComponentTree = (components: ComponentData[]): ComponentTree[] => {
  const rootChildren: ComponentTree[] = components.map((component) => {
    return {
      ...component,
      children: component.children.map((name) => {
        const child: ComponentTree = {
          name,
          events: [],
          props: [],
          states: [],
          types: [],
          children: [],
        };
        return child;
      }),
    };
  });
  return updateChildren(rootChildren, rootChildren);
};

export { createComponentTree };
export type { ComponentTree };
