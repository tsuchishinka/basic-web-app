type ComponentData = {
  name: string;
  props: {
    name: string;
    type: string | undefined;
    description?: string;
    default?: string | undefined;
    required?: boolean;
  }[];
  state: {
    name: string;
    type: string | undefined;
    description?: string;
    default?: string | undefined;
  }[];
  event: {
    name: string;
    args: string | undefined;
    returnType: string | undefined;
    description?: string;
  }[];
  type: {
    name: string;
    type: string | undefined;
    description?: string;
  }[];
  child: (string | undefined)[];
};

export type { ComponentData };
