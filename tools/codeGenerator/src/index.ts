import { generateComponent } from "./component/generator";
import { parseComponents } from "./component/parser/parseComponents";
import { generateFunction } from "./function/generator";
import { parseFunctions } from "./function/parser/parseFunction";
import { settings } from "./setting";

const main = async () => {
  const { category, componentType, csvFilePath, outputPath } = settings;
  if (category === "component") {
    const components = await parseComponents(csvFilePath);
    generateComponent(outputPath, components, componentType ?? "ui");
  }
  if (category === "function") {
    const functions = await parseFunctions(csvFilePath);
    generateFunction(outputPath, functions);
  }
  console.log(`generated on ${outputPath}!!!!`);
};

main();
