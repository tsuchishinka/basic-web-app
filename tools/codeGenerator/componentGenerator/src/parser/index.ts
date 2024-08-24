import { ComponentData } from "./ComponentData";
import { CsvParser } from "./CsvParser";

interface IParser {
  parse: (filePath: string) => Promise<ComponentData[]>;
}

class Parser {
  private parser: IParser | undefined;
  constructor(format: "csv") {
    if (format === "csv") {
      this.parser = new CsvParser();
    }
  }

  async parse(filePath: string): Promise<ComponentData[]> {
    return await this.parser!.parse(filePath);
  }
}

export { Parser };
export type { IParser };
