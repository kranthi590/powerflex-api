import { creteFactorySchema } from "./factory.create";

const getValidationSchema = (routePath: string, method: string) => {
  switch (true) {
    case routePath === "/api/v1/sprockets" && method.toLowerCase() === "post":
      return creteFactorySchema;
    default:
      throw new Error("NO_SCHEMA");
  }
};

export { getValidationSchema };
