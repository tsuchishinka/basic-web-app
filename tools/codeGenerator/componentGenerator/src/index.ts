import { parse } from "./parser";
import { generate } from "./generator";

const outputRootPath =
  "/Users/tsuchida/develop/webApplication/turbo-app-for-study/tools/codeGenerator/componentGenerator/test";
const csvFilePath = "/Users/tsuchida/Downloads/try-again-1.csv";

const main = async (componentPath: string, csvPath: string) => {
  generate(componentPath, await parse(csvPath));
  console.log(`generated!!!!`);
};

main(outputRootPath, csvFilePath);
