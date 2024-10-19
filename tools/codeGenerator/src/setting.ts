type Setting = {
  category: "component" | "function";
  componentType?: "ui" | "page";
  csvFilePath: string;
  outputPath: string;
};
const settings: Setting = {
  category: "component",
  componentType: "ui",
  csvFilePath: "/Users/tsuchida/Downloads/csvCodeGenerateFile/components.csv",
  outputPath:
    "/Users/tsuchida/develop/webApplication/basic-web-app/tools/codeGenerator/test",
};

export { settings };
