import fs from "fs";
import papaparse, { ParseConfig, ParseStepResult } from "papaparse";
import { ComponentData } from "./ComponentData";
import { IParser } from ".";

const getInitialComponentData = (): ComponentData => {
  return {
    name: "",
    child: [],
    props: [],
    event: [],
    type: [],
    state: [],
  };
};

class CsvParser implements IParser {
  parse(filePath: string): Promise<ComponentData[]> {
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
              rowData.length > columnIndex.name
                ? rowData[columnIndex.name]
                : "";
            const type =
              rowData.length > columnIndex.type
                ? rowData[columnIndex.type]
                : "";
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
            const args = type?.split("=>")[0];
            const returnTypeStr = type?.split("=>")[1]?.trim();
            switch (rowData[0]) {
              case "name":
                componentData.name = name;
                break;
              case "props":
                componentData.props.push({
                  name,
                  type,
                  description,
                  default: defaultData,
                  required,
                });
                break;
              case "state":
                componentData.state.push({
                  name,
                  type,
                  description,
                  default: defaultData,
                });
                break;
              case "type":
                componentData.type.push({
                  name,
                  type,
                  description,
                });
                break;
              case "event":
                componentData.event.push({
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
                break;
              case "child":
                componentData.child.push(name);
                break;
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
      const file = fs.readFileSync(filePath, "utf-8");
      papaparse.parse(file, config);
    });
  }
}
export { CsvParser };
