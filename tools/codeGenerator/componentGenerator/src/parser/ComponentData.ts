type HeaderIndex = {
  name: number;
  description: number;
  type: number;
  default: number;
  required: number;
};

type ComponentData = {
  name: string | undefined;
  props: {
    name: string | undefined;
    type: string | undefined;
    description?: string;
    default?: string | undefined;
    required?: boolean;
  }[];
  state: {
    name: string | undefined;
    type: string | undefined;
    description?: string;
    default?: string | undefined;
  }[];
  event: {
    name: string | undefined;
    type: string | undefined;
    description?: string;
  }[];
  type: {
    name: string | undefined;
    type: string | undefined;
    description?: string;
  }[];
  child: (string | undefined)[];
};

export type { HeaderIndex, ComponentData };
