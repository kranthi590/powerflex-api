import { Sequelize } from "sequelize";

import FactoryController from "./factory.controller";
import mockFactory from "../__mocks__/mock-factory";

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
    FactoryModel: {
      findOne: () => ({
        ...mockFactory,
      }),
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
    });
    mockResponse = () => {
      const res: any = {};
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);
      return res;
    };
  });

  const factory = new FactoryController();

  it("should getFactory by id", async () => {
    const resp = mockResponse();
    await factory.getFactory(mockRequest(), resp);
    expect(resp.status).toBeCalledWith(200);
    expect(resp.json).toBeCalledWith({
      data: {
        ...mockFactory,
        id: 1,
      },
      message: null,
      status: 200,
    });
  });
});
