import { ComponentData } from "../parser/ComponentData";
import { SCSS_TEMPLATE } from "../template/scss";

const getScssCode = (component: ComponentData) => {
  return SCSS_TEMPLATE.replace(/\{\$NAME\}/g, component.name);
};

export { getScssCode };
