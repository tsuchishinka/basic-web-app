import fs from "fs";
import papaparse, { ParseConfig, ParseStepResult } from "papaparse";
import { ComponentData } from "./ComponentData";

const getInitialComponentData = (): ComponentData => {
  return {
    name: "",
    children: [],
    props: [],
    events: [],
    types: [],
    states: [],
  };
};

const parseComponents = (csvFilePath: string): Promise<ComponentData[]> => {
  return new Promise((resolve) => {
    const columnIndex = {
      name: 0,
      type: 0,
      description: 0,
      default: 0,
      required: 0,
    };
    let isParsing = false;
    const componentDataList: ComponentData[] = [];
    let componentData: ComponentData = getInitialComponentData();
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
              : undefined;
          const defaultData =
            rowData.length > columnIndex.default
              ? rowData[columnIndex.default]
              : undefined;
          const required =
            rowData.length > columnIndex.required
              ? rowData[columnIndex.required] === "TRUE"
              : false;
          const args = type?.split("=>")[0];
          const returnTypeStr = type?.split("=>")[1]?.trim();

          if (name === undefined) {
            return;
          }

          const rowHeader = rowData[0];
          if (rowHeader === "name") {
            componentData.name = name;
          } else if (rowHeader.includes("prop")) {
            componentData.props.push({
              name,
              type,
              description,
              default: defaultData,
              required,
            });
          } else if (rowHeader.includes("state")) {
            componentData.states.push({
              name,
              type,
              description,
              default: defaultData,
            });
          } else if (rowHeader.includes("type")) {
            componentData.types.push({
              name,
              type,
              description,
            });
          } else if (rowHeader.includes("event")) {
            componentData.events.push({
              name,
              args: args
                ? args
                    .match(/\([\s\S]*\)/g)
                    ?.toString()
                    .slice(1, -1)
                : undefined,
              returnType: returnTypeStr,
              description,
            });
          } else if (rowHeader.includes("child")) {
            componentData.children.push(name);
          }
        } else if (isParsing) {
          // コンポーネントの区切りで空行になった時
          isParsing = false;
          componentDataList.push(componentData);
          componentData = getInitialComponentData();
        }
      },
      complete() {
        if (isParsing) {
          componentDataList.push(componentData);
        }
        resolve(componentDataList);
      },
    };
    const file = fs.readFileSync(csvFilePath, "utf-8");
    papaparse.parse(file, config);
  });
};
export { parseComponents };
