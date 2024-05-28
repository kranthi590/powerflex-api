import { Sequelize } from "sequelize";

import Logger from "../utils/logger";

let sequelize: Sequelize;

const setConnection = (sequelizeConnection: Sequelize) => {
  sequelize = sequelizeConnection;
};

const initSqlConnection = async () => {
  try {
    const connectionUrl =
      process.env.SQL_CONNECTION_URL ||
      "postgres://postgres:secps12et@localhost:5432/powerflex";
    Logger.debug("Initialize db connection....");
    const connection = new Sequelize(connectionUrl, {
      logging: process.env.SQL_DEBUG === "true",
    });
    await connection.authenticate();
    setConnection(connection);
    require("./models");
    await connection.sync({ force: false });
    // const { checkAndInsertData } = require("./master.data");
    // await checkAndInsertData();
    Logger.info("Connection has been established successfully.");
    return true;
  } catch (error) {
    console.error(error);
    Logger.error("Unable to connect to the database:", error);
    return false;
  }
};

const closeConnection = async () => {
  if (sequelize) {
    await sequelize.close();
  }
};

const getConnection = () => sequelize;

export { initSqlConnection, closeConnection, sequelize, getConnection };
