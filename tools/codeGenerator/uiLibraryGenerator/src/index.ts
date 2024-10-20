import { settings } from "../setting";
import { generateComponent } from "./generator";
import { parseComponents } from "./parser/parseComponents";

const main = async () => {
  const { csvFilePath, outputPath } = settings;
  const components = await parseComponents(csvFilePath);
  generateComponent(outputPath, components);
  console.log(`generated on ${outputPath}!!!!`);
};

main();
