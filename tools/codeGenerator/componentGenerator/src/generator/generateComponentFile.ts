import { ComponentData } from "../parser/ComponentData";
import {
  COMPONENT_TEMPLATE,
  DEFAULT_TEMPLATE,
  EVENT_TEMPLATE,
  PROPS_TEMPLATE,
  STATE_TEMPLATE,
  TYPE_TEMPLATE,
} from "../template/component";
import fs from "fs";
import cloneDeep from "lodash.clonedeep";

const isInvalid = (property: string | undefined) => {
  if (undefined || property?.length === 0) {
    return true;
  }
  return false;
};

const getPropsCode = (propsList: ComponentData["props"]) => {
  return propsList
    .map((prop) => {
      if (isInvalid(prop.name)) {
        return "";
      }
      return PROPS_TEMPLATE.replace("{$NAME}", prop.name!)
        .replace("{$TYPE}", prop.type ?? "{$TYPE}")
        .replace("{$REQUIRED}", prop.required ? "" : "?")
        .replace("{$DESCRIPTION", prop.description ?? "");
    })
    .join("\n");
};

const getDefaultCode = (propsList: ComponentData["props"]) => {
  return propsList
    .map((prop) => {
      if (isInvalid(prop.name)) {
        return "";
      }
      return DEFAULT_TEMPLATE.replace("{$NAME}", prop.name!).replace(
        "{$DEFAULT}",
        isInvalid(prop.default) ? "" : ` = ${prop.default}`
      );
    })
    .join("\n");
};

const isPremitiveType = (type: string) => {
  if (type === "boolean" || type === "string" || type === "number") {
    return true;
  }
  return false;
};

const getStateCode = (stateList: ComponentData["state"]) => {
  return stateList
    .map((state) => {
      if (isInvalid(state.name)) {
        return "";
      }
      return STATE_TEMPLATE.replace("{$NAME}", state.name!)
        .replace(
          "{$TYPE}",
          isInvalid(state.type) || isPremitiveType(state.type!)
            ? ""
            : `<${state.type}>`
        )
        .replace("{$DEFAULT}", state.default ? state.default : "");
    })
    .join("\n");
};

const getTypeCode = (typeList: ComponentData["type"]) => {
  return typeList
    .map((type) => {
      if (isInvalid(type.name)) {
        return "";
      }
      return TYPE_TEMPLATE.replace("{$NAME}", type.name!).replace(
        "{$TYPE}",
        type.type ?? ""
      );
    })
    .join("\n");
};

const getEventCode = (eventList: ComponentData["event"]) => {
  return eventList
    .map((event) => {
      if (isInvalid(event.name)) {
        return "";
      }
      return EVENT_TEMPLATE.replace("{$NAME}", event.name!).replace(
        "{$TYPE}",
        event.type ?? ""
      );
    })
    .join("\n");
};

const getComponentCode = (componentData: ComponentData) => {
  if (isInvalid(componentData.name)) {
    return undefined;
  }
  return COMPONENT_TEMPLATE.replace(
    "{$PROPS}",
    getPropsCode(componentData.props)
  )
    .replace("{$NAME}", componentData.name!)
    .replace("{$DEFAULT}", getDefaultCode(componentData.props))
    .replace("{$STATE}", getStateCode(componentData.state))
    .replace("{$EVENT}", getEventCode(componentData.event))
    .replace("{$TYPE}", getTypeCode(componentData.type));
};

const writeComponentFile = (destPath: string, componentData: ComponentData) => {
  const componentCode = getComponentCode(componentData);
  if (componentCode === undefined) {
    return;
  }
  fs.writeFileSync(destPath, componentCode);
};

type ComponentTree = {
  name: string | undefined;
  parent: string | undefined;
  ancestors: string[];
};

const appendParentAncestors = (
  componentTree: ComponentTree[],
  nodeName: string
): ComponentTree[] => {
  const newComponentTree = cloneDeep(componentTree);
  const updatedNode = newComponentTree.find((node) => node.name === nodeName);
  if (updatedNode?.parent !== undefined) {
    const newParentNode = appendParentAncestors(
      newComponentTree,
      updatedNode.parent
    ).find((item) => item.name === updatedNode.parent);
    if (newParentNode !== undefined) {
      updatedNode.ancestors = [
        ...updatedNode.ancestors,
        ...newParentNode.ancestors,
      ];
    }
  }
  return newComponentTree;
};

const generateComponentFile = (
  destPath: string,
  componentDataList: ComponentData[]
) => {
  const rootPath = destPath;
  let componentTree: ComponentTree[] = componentDataList.map((item) => {
    return {
      name: item.name,
      parent: undefined,
      ancestors: [],
    };
  });
  componentDataList.forEach((componentData) => {
    componentData.child.forEach((item) => {
      const treeItem = componentTree.find((tree) => tree.name === item);
      if (treeItem !== undefined) {
        treeItem.parent = componentData.name;
        treeItem.ancestors = [componentData.name!];
      }
    });
  });
  for (const tree of componentTree) {
    componentTree = appendParentAncestors(componentTree, tree.name!);
  }
};
