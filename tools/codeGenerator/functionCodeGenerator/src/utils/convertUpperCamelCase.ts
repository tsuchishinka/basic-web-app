const convertUpperCamelCase = (value: string) => {
  return value
    .replace(/(?:^|[-_\s])(\w)/g, (_, s) => (s ? s.toUpperCase() : ""))
    .replace(/[^0-9a-zA-Z]/g, "");
};

export { convertUpperCamelCase };
