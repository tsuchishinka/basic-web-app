import { execSync } from "child_process";
import fs from "fs";

/////////
const componentImportPath =
  "/Users/tsuchida/Downloads/slideAppDesign/components.csv";
const actionImportPath = "/Users/tsuchida/Downloads/slideAppDesign/actions.csv";
const selectorImportPath =
  "/Users/tsuchida/Downloads/slideAppDesign/selector.csv";
const outputPath =
  "/Users/tsuchida/develop/webApplication/basic-web-app/apps/front-challenge/src/feature/Slide";
////////

const result = execSync(
  `cd ../pageComponentCodeGenerator && yarn generate ${componentImportPath} ${outputPath}`
);
console.log(result.toString());
execSync(
  `cd ../functionCodeGenerator && yarn generate ${actionImportPath} ${outputPath}/controller/actions`
);
fs.writeFileSync(`${outputPath}/controller/state.ts`, "");
execSync(
  `cd ../functionCodeGenerator && yarn generate ${selectorImportPath} ${outputPath}/controller/selectors`
);
