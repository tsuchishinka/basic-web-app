import { generate } from "./generator";
import { Parser } from "./parser";

const outputRootPath =
  "/Users/tsuchida/develop/webApplication/turbo-app-for-study/tools/codeGenerator/componentGenerator/test";
const csvFilePath = "/Users/tsuchida/Downloads/try-test.csv";

const main = async (componentPath: string, csvPath: string) => {
  const parser = new Parser("csv");
  generate(componentPath, await parser.parse(csvPath));
  console.log(`generated!!!!`);
};

main(outputRootPath, csvFilePath);
