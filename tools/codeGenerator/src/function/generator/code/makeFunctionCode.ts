import { FunctionData } from "../../parser/FunctionData";
import {
  ARG_DESCRIPTION_TEMPLATE,
  ARG_TEMPLATE,
  DESCRIPTION_TEMPLATE,
  FUNCTION_TEMPLATE,
  TYPE_TEMPLATE,
} from "./template";

const makeTypeCode = (types: FunctionData["types"]) => {
  return types
    .map(({ name, type }) => {
      return TYPE_TEMPLATE.replace(/\{\$NAME\}/g, name).replace(
        /\{\$TYPE\}/g,
        type,
      );
    })
    .join("\n");
};

const makeDescriptionCode = (
  description: FunctionData["description"],
  args: FunctionData["args"],
) => {
  return DESCRIPTION_TEMPLATE.replace(
    /\{\$ARG_DESCRIPTION\}/g,
    args
      .map(({ name, description }) => {
        return ARG_DESCRIPTION_TEMPLATE.replace(/\{\$NAME\}/g, name).replace(
          /\{\$DESCRIPTION\}/g,
          description ?? "",
        );
      })
      .join("\n"),
  ).replace(/\{\$DESCRIPTION\}/g, description ?? "");
};

const makeArgsCode = (args: FunctionData["args"]) => {
  return args
    .map(({ name, type }, index) => {
      if (index < args.length - 1) {
        return (
          ARG_TEMPLATE.replace(/\{\$NAME\}/g, name).replace(
            /\{\$TYPE\}/g,
            type,
          ) + ","
        );
      }
      return ARG_TEMPLATE.replace(/\{\$NAME\}/g, name).replace(
        /\{\$TYPE\}/g,
        type,
      );
    })
    .join("\n");
};

const makeFunctionCode = (functionData: FunctionData) => {
  const { name, types, args, description, returnType } = functionData;
  return FUNCTION_TEMPLATE.replace(/\{\$NAME\}/g, name)
    .replace(/\{\$TYPE\}/g, makeTypeCode(types))
    .replace(/\{\$DESCRIPTION\}/g, makeDescriptionCode(description, args))
    .replace(/\{\$ARGS\}/g, makeArgsCode(args))
    .replace(/\{\$RETURN_TYPE\}/g, returnType ? `: ${returnType}` : "");
};

export { makeFunctionCode };
