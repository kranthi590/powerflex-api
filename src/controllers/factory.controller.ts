import { Request, Response } from "express";
import { logger } from "../utils";
import { FactoryModel, IFactoryModel } from "../db/models";
import { HttpCodes, ResponseTransforms } from "../response.transforms";

export default class FactoryController {
  constructor() {}

  async getFactory(req: Request, res: Response) {
    let response;
    try {
      const id = req.params.id;
      const factory: IFactoryModel | null = await FactoryModel.findOne({
        where: { id: id },
      });
      if (factory) {
        response = ResponseTransforms.transformResponse(
          HttpCodes.OkResponse,
          null,
          factory,
        );
      } else {
        response = ResponseTransforms.transformResponse(
          HttpCodes.NotFoundResponse,
          "ID_NOT_FOUND",
          null,
        );
      }
    } catch (error: any) {
      console.error(error);
      logger.error({ message: "getFactory failed.", error });
      response = ResponseTransforms.transformResponse(
        HttpCodes.InternalServerErrorResponse,
        null,
        error.message,
      );
    }
    res.status(response.status).json(response);
  }
}
