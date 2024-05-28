import { Request, Response, NextFunction } from "express";

import { getValidationSchema } from "../validations";
import { logger } from "../utils";
import { HttpCodes, ResponseTransforms } from "../response.transforms";

const validate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = getValidationSchema(req.originalUrl, req.method);
    schema.unknown();
    await schema.validateAsync(
      { ...req.body, ...req.query },
      { abortEarly: false },
    );
    next();
  } catch (error: any) {
    logger.error("Error while validating request", error);
    res
      .status(HttpCodes.BadRequestResponse)
      .json(
        ResponseTransforms.transformResponse(
          HttpCodes.BadRequestResponse,
          error.message === "NO_SCHEMA"
            ? "NO_VALIDATION_SCHEMA_DEFINED"
            : "VALIDATION_ERROR",
          {},
          error.details,
        ),
      );
  }
};

export default validate;
