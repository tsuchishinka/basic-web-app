import fs from "fs";
import { FunctionData } from "../parser/FunctionData";
import { mkdir } from "../utils/mkdir";
import { getFunctionCode } from "./getFunctionCode";

const generateFunction = (destPath: string, functions: FunctionData[]) => {
  for (const functionData of functions) {
    const dirPath = `${destPath}/${functionData.name}`;
    mkdir(dirPath);
    const functionCode = getFunctionCode(functionData);
    fs.writeFileSync(`${dirPath}/index.tsx`, functionCode);
  }
};

export { generateFunction };
