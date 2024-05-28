import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";

import { getConnection } from "../connection";

interface ISpRocketModel
  extends Model<
    InferAttributes<ISpRocketModel>,
    InferCreationAttributes<ISpRocketModel>
  > {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  id: CreationOptional<number>;
  teeth: number;
  pitchDiameter: number;
  outsideDiameter: number;
  pitch: number;
}

const SpRocketModel = getConnection().define<ISpRocketModel>("spRocket", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  teeth: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  pitchDiameter: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "pitch_diameter",
  },
  outsideDiameter: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "outside_diameter",
  },
  pitch: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default SpRocketModel;
export { ISpRocketModel };
