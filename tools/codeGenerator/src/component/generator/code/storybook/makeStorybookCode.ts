import { convertUpperCamelCase } from "../../../../utils/convertUpperCamelCase";
import { ComponentData } from "../../../parser/ComponentData";
import { ARGS_TEMPLATE, STORYBOOK_TEMPLATE } from "./template";

const getArgs = (props: ComponentData["props"]) => {
  return props
    .map((props) => {
      return ARGS_TEMPLATE.replace(/\{\$PROPS_NAME\}/g, props.name).replace(
        /\{\$PROPS_DEFAULT\}/g,
        props.default ?? "undefined"
      );
    })
    .join("\n");
};

const makeStorybookCode = (componentData: ComponentData) => {
  return STORYBOOK_TEMPLATE.replace(
    /\{\$NAME\}/g,
    convertUpperCamelCase(componentData.name)
  ).replace(/\{\$ARGS\}/g, getArgs(componentData.props));
};

export { makeStorybookCode };
