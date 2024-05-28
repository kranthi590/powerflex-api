import { Request, Response } from "express";

import { HttpCodes, ResponseTransforms } from "../response.transforms";

export default function apiErrorHandler(
  err: any,
  req: Request,
  res: Response,
  message: string,
) {
  res
    .status(HttpCodes.InternalServerErrorResponse)
    .json(
      ResponseTransforms.transformResponse(
        HttpCodes.InternalServerErrorResponse,
        message,
      ),
    );
}
