type Setting = {
  category: "component" | "function";
  componentType?: "ui" | "app";
  csvFilePath: string;
  outputPath: string;
};
const settings: Setting = {
  category: "function",
  componentType: "app",
  csvFilePath: "/Users/tsuchida/Downloads/csvCodeGenerateFile/functions.csv",
  outputPath:
    "/Users/tsuchida/develop/webApplication/basic-web-app/tools/codeGenerator/test",
};

export { settings };
