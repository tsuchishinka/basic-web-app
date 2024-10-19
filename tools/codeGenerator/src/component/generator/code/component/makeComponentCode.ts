import { convertUpperCamelCase } from "../../../../utils/convertUpperCamelCase";
import { ComponentData } from "../../../parser/ComponentData";
import {
  COMPONENT_TEMPLATE,
  DEFAULT_TEMPLATE,
  DEFAULT_VALUE_TEMPLATE,
  EVENT_RETURN_TYPE_TEMPLATE,
  EVENT_TEMPLATE,
  PROPS_DESCRIPTION_TEMPLATE,
  PROPS_TEMPLATE,
  PROPS_TYPE_TEMPLATE,
  STATE_TEMPLATE,
  STATE_TYPE_TEMPLATE,
  TYPE_TEMPLATE,
} from "./template";

const makePropsCode = (propsList: ComponentData["props"]) => {
  return propsList
    .map(({ name, type, required, description }) => {
      return PROPS_TEMPLATE.replace(/\{\$NAME\}/g, name)
        .replace(
          /\{\$PROPS_TYPE\}/g,
          type ? PROPS_TYPE_TEMPLATE.replace(/\{\$TYPE\}/g, type) : "",
        )
        .replace(/\{\$REQUIRED\}/g, required ? "" : "?")
        .replace(
          /\{\$PROPS_DESCRIPTION\}/g,
          description
            ? PROPS_DESCRIPTION_TEMPLATE.replace(
                /\{\$DESCRIPTION\}/g,
                description,
              )
            : "",
        );
    })
    .join("\n");
};

const makeInitialValue = (propsList: ComponentData["props"]) => {
  return propsList
    .map(({ name, default: defaultValue }, index) => {
      return (
        DEFAULT_TEMPLATE.replace(/\{\$NAME\}/g, name).replace(
          /\{\$DEFAULT_VALUE\}/g,
          defaultValue
            ? DEFAULT_VALUE_TEMPLATE.replace(
                /\{\$VALUE\}/g,
                defaultValue ?? "undefined",
              )
            : "",
        ) + (index < propsList.length - 1 ? "," : "")
      );
    })
    .join("\n");
};

const makeStateCode = (stateList: ComponentData["state"]) => {
  return stateList
    .map(({ name, type, default: defaultValue }) => {
      return STATE_TEMPLATE.replace(/\{\$NAME\}/g, name)
        .replace("{$SET_NAME}", `set${convertUpperCamelCase(name)}`)
        .replace(
          /\{\$STATE_TYPE\}/g,
          type ? STATE_TYPE_TEMPLATE.replace(/\{\$TYPE\}/g, type) : "",
        )
        .replace("{$DEFAULT}", defaultValue ?? "");
    })
    .join("\n");
};

const makeTypeCode = (typeList: ComponentData["type"]) => {
  return typeList
    .map(({ name, type }) => {
      return TYPE_TEMPLATE.replace(/\{\$NAME\}/g, name).replace(
        /\{\$TYPE\}/g,
        type ?? "",
      );
    })
    .join("\n");
};

const makeEventCode = (eventList: ComponentData["event"]) => {
  return eventList
    .map(({ name, args, returnType }) => {
      return EVENT_TEMPLATE.replace(/\{\$NAME\}/g, name)
        .replace(
          /\{\$ASYNC\}/g,
          returnType?.includes("Promise") ? "async " : "",
        )
        .replace(/\{\$ARG_TYPE\}/g, args ?? "")
        .replace(
          /\{\$RETURN_TYPE\}/g,
          returnType
            ? EVENT_RETURN_TYPE_TEMPLATE.replace(/\{\$TYPE\}/g, returnType)
            : "",
        );
    })
    .join("\n");
};

const makeComponentCode = (componentData: ComponentData) => {
  return COMPONENT_TEMPLATE.replace(
    /\{\$PROPS\}/g,
    makePropsCode(componentData.props),
  )
    .replace(/\{\$NAME\}/g, convertUpperCamelCase(componentData.name))
    .replace(/\{\$DEFAULT\}/g, makeInitialValue(componentData.props))
    .replace(/\{\$STATE\}/g, makeStateCode(componentData.state))
    .replace(/\{\$EVENT\}/g, makeEventCode(componentData.event))
    .replace(/\{\$TYPE\}/g, makeTypeCode(componentData.type));
};

export { makeComponentCode };
