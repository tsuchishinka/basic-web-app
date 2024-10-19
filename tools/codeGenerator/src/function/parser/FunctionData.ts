type FunctionData = {
  name: string;
  args: {
    name: string;
    type: string;
    description: string | undefined;
    required: boolean;
    default: string | undefined;
  }[];
  types: {
    name: string;
    type: string;
    description: string | undefined;
  }[];
  returnType: string | undefined;
  description: string | undefined;
};

export type { FunctionData };
