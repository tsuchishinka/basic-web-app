import papaparse, { ParseConfig, ParseStepResult } from "papaparse";
import fs from "fs";
import { HeaderIndex, ComponentData } from "./ComponentData";

const getArrayData = <T>(array: T[], index: number) => {
  if (index > array.length - 1) {
    return undefined;
  }
  return array[index];
};

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

const parseCsv = async (filePath: string): Promise<ComponentData[]> => {
  return new Promise((resolve) => {
    let headerIndex: HeaderIndex = {
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
        if (rowData.length > 0 && rowData[0] && rowData[0] !== "") {
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
                headerIndex[data] = index;
              }
            });
            return;
          }
          switch (rowData[0]) {
            case "name":
              componentData.name = getArrayData(rowData, headerIndex.name);
            case "props":
              componentData.props.push({
                name: getArrayData(rowData, headerIndex.name),
                type: getArrayData(rowData, headerIndex.type),
                description: getArrayData(rowData, headerIndex.description),
                default: getArrayData(rowData, headerIndex.default),
                required:
                  getArrayData(rowData, headerIndex.required) === "TRUE",
              });
            case "state":
              componentData.props.push({
                name: getArrayData(rowData, headerIndex.name),
                type: getArrayData(rowData, headerIndex.type),
                description: getArrayData(rowData, headerIndex.description),
                default: getArrayData(rowData, headerIndex.default),
              });
            case "type":
              componentData.type.push({
                name: getArrayData(rowData, headerIndex.name),
                type: getArrayData(rowData, headerIndex.type),
                description: getArrayData(rowData, headerIndex.description),
              });
            case "event":
              componentData.event.push({
                name: getArrayData(rowData, headerIndex.name),
                type: getArrayData(rowData, headerIndex.type),
                description: getArrayData(rowData, headerIndex.description),
              });
              break;
            case "child":
              componentData.child.push(getArrayData(rowData, headerIndex.name));
              break;
          }
        } else if (isParsing) {
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
};

export { parseCsv };
