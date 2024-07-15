import { parseCsv } from "./parser";

(async () => {
  const result = await parseCsv("/home/tsuchida/Downloads/try.csv");
  console.log(JSON.stringify(result));
})();
