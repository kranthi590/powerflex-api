import { Request, Response } from "express";
import { logger } from "../utils";
import { SpRocketModel } from "../db/models";
import { HttpCodes, ResponseTransforms } from "../response.transforms";

interface ISpRocket {
  pitchDiameter: number;
  outsideDiameter: number;
  teeth: number;
  pitch: number;
  id?: number | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export default class SpRocketsController {
  constructor() {}

  async getSpRocket(req: Request, res: Response) {
    let response;
    try {
      const id = req.params.id;
      const spRocket = await SpRocketModel.findOne({
        where: { id: id },
      });
      if (spRocket) {
        response = ResponseTransforms.transformResponse(
          HttpCodes.OkResponse,
          null,
          spRocket,
        );
      } else {
        response = ResponseTransforms.transformResponse(
          HttpCodes.NotFoundResponse,
          "ID_NOT_FOUND",
          null,
        );
      }
    } catch (error: any) {
      logger.error({ message: "getSpRocket failed.", error });
      response = ResponseTransforms.transformResponse(
        HttpCodes.InternalServerErrorResponse,
        null,
        error.message,
      );
    }
    res.status(response.status).json(response);
  }

  async getAllSpRockets(req: Request, res: Response) {
    let response;
    try {
      const allSpRockets = await SpRocketModel.findAll({});
      response = ResponseTransforms.transformResponse(
        HttpCodes.OkResponse,
        null,
        allSpRockets,
      );
    } catch (error: any) {
      logger.error({ message: "getAllSpRockets failed.", error });
      response = ResponseTransforms.transformResponse(
        HttpCodes.InternalServerErrorResponse,
        null,
        error.message,
      );
    }
    res.status(response.status).json(response);
  }

  async createOrUpdateSpRocket(req: Request, res: Response) {
    let response;
    try {
      const { pitchDiameter, outsideDiameter, teeth, pitch }: ISpRocket =
        req.body;
      const id = req.params.id ? parseInt(req.params.id) : undefined;
      const options: any = {
        returning: true,
        validate: true,
      };
      const spRocket = await SpRocketModel.upsert(
        {
          pitchDiameter,
          outsideDiameter,
          teeth,
          pitch,
          id,
        },
        options,
      );
      response = ResponseTransforms.transformResponse(
        HttpCodes.OkResponse,
        null,
        spRocket,
      );
    } catch (error: any) {
      console.error(error);
      logger.error({ message: "createOrUpdateSpRocket failed.", error });
      response = ResponseTransforms.transformResponse(
        HttpCodes.InternalServerErrorResponse,
        error.message,
        null,
      );
    }
    res.status(response.status).json(response);
  }
}
