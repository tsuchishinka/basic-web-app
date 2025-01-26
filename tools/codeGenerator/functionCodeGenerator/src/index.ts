import { generateFunction } from "./generator";
import { parseFunctions } from "./parser/parseFunction";
import { settings } from "./setting";

const main = async () => {
  const csvInputFile = process.argv[2] ?? settings.csvFilePath;
  const outputPath = process.argv[3] ?? settings.outputPath;
  const functions = await parseFunctions(csvInputFile);
  generateFunction(outputPath, functions);
  console.log(`generated on ${outputPath}!!!!`);
};

main();
