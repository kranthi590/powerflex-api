import { Sequelize } from "sequelize";

import SpRocketsController from "./sprockets.controller";
import { mockSprocket, allSpRockets } from "../__mocks__/mock-sprocket";

jest.mock("sequelize", () => {
  const mSequelize = {
    authenticate: jest.fn(),
    define: jest.fn(),
  };
  const actualSequelize = jest.requireActual("sequelize");
  return {
    Sequelize: jest.fn(() => mSequelize),
    DataTypes: actualSequelize.DataTypes,
  };
});

//  const mSequelizeContext = new Sequelize();
jest.mock("../db/connection", () => {
  const actualSequelize = jest.requireActual("../db/connection");
  return {
    ...actualSequelize,
    getConnection: () => new Sequelize(),
  };
});

jest.mock("../db/models", () => {
  return {
    SpRocketModel: {
      findOne: (condition: any) => {
        return new Promise((resolve) => {
          if (condition.where.id === 2) {
            return resolve(null);
          }
          return resolve(mockSprocket);
        });
      },
      findAll: () => new Promise((resolve) => resolve(allSpRockets)),
      upsert: () => new Promise((resolve) => resolve(mockSprocket)),
    },
  };
});

describe("Factory controller tests", () => {
  let mockRequest: any;
  let mockResponse: any;
  beforeEach(() => {
    mockRequest = () => ({
      params: {
        id: 1,
      },
      body: mockSprocket,
    });
    mockResponse = () => {
      const res: any = {};
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);
      return res;
    };
  });

  const spRocketsController = new SpRocketsController();

  it("should getFactory by id", async () => {
    const resp = mockResponse();
    await spRocketsController.getSpRocket(mockRequest(), resp);
    expect(resp.status).toBeCalledWith(200);
    expect(resp.json).toBeCalledWith({
      data: {
        ...mockSprocket,
        id: 3,
      },
      message: null,
      status: 200,
    });
  });

  it("should get 404 response for getFactory by id", async () => {
    const resp = mockResponse();
    const req = mockRequest();
    req.params.id = 2;
    await spRocketsController.getSpRocket(req, resp);
    expect(resp.status).toBeCalledWith(404);
    expect(resp.json).toBeCalledWith({
      data: null,
      message: "ID_NOT_FOUND",
      status: 404,
    });
  });

  it("should getAllSpRockets", async () => {
    const resp = mockResponse();
    await spRocketsController.getAllSpRockets(mockRequest(), resp);
    expect(resp.status).toBeCalledWith(200);
    expect(resp.json).toBeCalledWith({
      data: [
        {
          ...mockSprocket,
          id: 3,
        },
      ],
      message: null,
      status: 200,
    });
  });

  it("should create new sprocket", async () => {
    const resp = mockResponse();
    const req = mockRequest();
    req.params.id = undefined;
    await spRocketsController.createOrUpdateSpRocket(req, resp);
    expect(resp.status).toBeCalledWith(200);
    expect(resp.json).toBeCalledWith({
      data: {
        ...mockSprocket,
        id: 3,
      },
      message: null,
      status: 200,
    });
  });

  it("should update sprocket", async () => {
    const resp = mockResponse();
    const req = mockRequest();
    await spRocketsController.createOrUpdateSpRocket(req, resp);
    expect(resp.status).toBeCalledWith(200);
    expect(resp.json).toBeCalledWith({
      data: {
        ...mockSprocket,
        id: 3,
      },
      message: null,
      status: 200,
    });
  });
});
