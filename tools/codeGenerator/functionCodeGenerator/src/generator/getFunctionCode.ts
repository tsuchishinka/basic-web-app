import { FunctionData } from "../parser/FunctionData";
import {
  ARG_DESCRIPTION_TEMPLATE,
  ARG_TEMPLATE,
  DESCRIPTION_TEMPLATE,
  FUNCTION_TEMPLATE,
  TYPE_TEMPLATE,
} from "./template";

const getTypeCode = (types: FunctionData["types"]) => {
  return types
    .map(({ name, type }) => {
      return TYPE_TEMPLATE.replace(/\{\$NAME\}/g, name).replace(
        /\{\$TYPE\}/g,
        type
      );
    })
    .join("\n");
};

const getDescriptionCode = (
  description: FunctionData["description"],
  args: FunctionData["args"]
) => {
  return DESCRIPTION_TEMPLATE.replace(
    /\{\$ARG_DESCRIPTION\}/g,
    args
      .map(({ name, description }) => {
        return ARG_DESCRIPTION_TEMPLATE.replace(/\{\$NAME\}/g, name).replace(
          /\{\$DESCRIPTION\}/g,
          description ?? ""
        );
      })
      .join("\n")
  ).replace(/\{\$DESCRIPTION\}/g, description ?? "");
};

const getArgsCode = (args: FunctionData["args"]) => {
  return args
    .map(({ name, type }, index) => {
      if (index < args.length - 1) {
        return (
          ARG_TEMPLATE.replace(/\{\$NAME\}/g, name).replace(
            /\{\$TYPE\}/g,
            type
          ) + ","
        );
      }
      return ARG_TEMPLATE.replace(/\{\$NAME\}/g, name).replace(
        /\{\$TYPE\}/g,
        type
      );
    })
    .join("\n");
};

const getFunctionCode = (functionData: FunctionData) => {
  const { name, types, args, description, returnType } = functionData;
  return FUNCTION_TEMPLATE.replace(/\{\$NAME\}/g, name)
    .replace(/\{\$TYPE\}/g, getTypeCode(types))
    .replace(/\{\$DESCRIPTION\}/g, getDescriptionCode(description, args))
    .replace(/\{\$ARGS\}/g, getArgsCode(args))
    .replace(/\{\$RETURN_TYPE\}/g, returnType ? `: ${returnType}` : "");
};

export { getFunctionCode };
