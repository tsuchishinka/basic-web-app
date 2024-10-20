import { settings } from "../setting";
import { generateFunction } from "./generator";
import { parseFunctions } from "./parser/parseFunction";

const main = async () => {
  const { csvFilePath, outputPath } = settings;
  const functions = await parseFunctions(csvFilePath);
  generateFunction(outputPath, functions);
  console.log(`generated on ${outputPath}!!!!`);
};

main();
