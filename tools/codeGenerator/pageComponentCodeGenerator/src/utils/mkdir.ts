import fs from "fs";

const mkdir = (path: string) => {
  if (fs.existsSync(path)) {
    return;
  }
  fs.mkdirSync(path, { recursive: true });
};

export { mkdir };
