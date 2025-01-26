import { generateComponent } from "./generator";
import { parseComponents } from "./parser/parseComponents";
import { settings } from "./setting";

const main = async () => {
  const csvInputFile = process.argv[2] ?? settings.csvFilePath;
  const outputPath = process.argv[3] ?? settings.outputPath;
  const components = await parseComponents(csvInputFile);
  await generateComponent(outputPath, components);

  console.log(`generated on ${outputPath}!!!!`);
};

main();
