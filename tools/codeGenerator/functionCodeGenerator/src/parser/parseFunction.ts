import fs from "fs";
import papaparse, { ParseConfig, ParseStepResult } from "papaparse";
import { FunctionData } from "./FunctionData";

const getInitialFunctionData = (): FunctionData => {
  return {
    name: "",
    args: [],
    types: [],
    returnType: undefined,
    description: "",
  };
};

const parseFunctions = (csvFilePath: string): Promise<FunctionData[]> => {
  return new Promise((resolve) => {
    const columnIndex = {
      name: 0,
      type: 0,
      description: 0,
      default: 0,
      required: 0,
    };
    let isParsing = false;
    const functionDataList: FunctionData[] = [];
    let functionData: FunctionData = getInitialFunctionData();
    const config: ParseConfig = {
      header: false,
      delimiter: ",",
      step(results: ParseStepResult<string[]>) {
        const { data: rowData } = results;
        if (rowData.length > 0 && rowData[0]) {
          isParsing = true;

          if (rowData[0].includes("#")) {
            rowData.forEach((data, index) => {
              if (
                data === "name" ||
                data === "type" ||
                data === "description" ||
                data === "default" ||
                data === "required"
              ) {
                columnIndex[data] = index;
              }
            });
            return;
          }
          const name =
            rowData.length > columnIndex.name ? rowData[columnIndex.name] : "";
          const type =
            rowData.length > columnIndex.type ? rowData[columnIndex.type] : "";
          const description =
            rowData.length > columnIndex.description
              ? rowData[columnIndex.description]
              : "";
          const defaultData =
            rowData.length > columnIndex.default
              ? rowData[columnIndex.default]
              : "";
          const required =
            rowData.length > columnIndex.required
              ? rowData[columnIndex.required] === "TRUE"
              : false;

          if (name === undefined) {
            return;
          }

          const rowHeader = rowData[0];
          if (rowHeader === "name") {
            functionData.name = name;
            functionData.returnType = type;
            functionData.description = description;
          } else if (rowHeader.includes("arg")) {
            if (type !== undefined) {
              functionData.args.push({
                name,
                type,
                default: defaultData,
                required,
                description,
              });
            }
          } else if (rowHeader.includes("type")) {
            if (type !== undefined) {
              functionData.types.push({
                name,
                type,
                description,
              });
            }
          }
        } else if (isParsing) {
          // コンポーネントの区切りで空行になった時
          isParsing = false;
          functionDataList.push(functionData);
          functionData = getInitialFunctionData();
        }
      },
      complete() {
        if (isParsing) {
          functionDataList.push(functionData);
        }
        resolve(functionDataList);
      },
    };
    const file = fs.readFileSync(csvFilePath, "utf-8");
    papaparse.parse(file, config);
  });
};
export { parseFunctions };
