import fs from "fs";
import { mkdir } from "../../utils/mkdir";
import { FunctionData } from "../parser/FunctionData";
import { makeFunctionCode } from "./code/makeFunctionCode";

const generateFunction = (destPath: string, functions: FunctionData[]) => {
  for (const functionData of functions) {
    let dirPath = `${destPath}/${functionData.name}`;
    if (functionData.path) {
      dirPath = `${destPath}/${functionData.path}/${functionData.name}`;
    }
    mkdir(dirPath);
    const functionCode = makeFunctionCode(functionData);
    fs.writeFileSync(`${dirPath}/index.tsx`, functionCode);
  }
};

export { generateFunction };
