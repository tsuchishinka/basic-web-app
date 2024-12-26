class CustomError extends Error {
  code: string;
  constructor(message: string) {
    super(message);
    this.code = "002";
  }
}

const executeError = () => {
  try {
    throw new CustomError("yes");
  } catch (error) {
    if (error instanceof CustomError) {
      console.log(error);
    }
  }
};

export { executeError };
