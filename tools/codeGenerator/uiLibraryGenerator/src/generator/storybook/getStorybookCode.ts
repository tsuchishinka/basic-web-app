import { ComponentData } from "../../parser/ComponentData";
import { convertUpperCamelCase } from "../../utils/convertUpperCamelCase";
import { ARGS_TEMPLATE, STORYBOOK_TEMPLATE } from "./template";

const getArgs = (props: ComponentData["props"]) => {
  return props
    .map(({ name, default: defaultValue }, index) => {
      return (
        ARGS_TEMPLATE.replace(/\{\$NAME\}/g, name).replace(
          /\{\$DEFAULT\}/g,
          defaultValue ?? "undefined"
        ) + (index < props.length - 1 ? "," : "")
      );
    })
    .join("\n");
};

const getStorybookCode = (componentData: ComponentData) => {
  return STORYBOOK_TEMPLATE.replace(
    /\{\$NAME\}/g,
    convertUpperCamelCase(componentData.name)
  ).replace(/\{\$ARGS\}/g, getArgs(componentData.props));
};

export { getStorybookCode };
