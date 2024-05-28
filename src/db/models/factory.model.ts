import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";

import { getConnection } from "../connection";

interface IFactoryModel
  extends Model<
    InferAttributes<IFactoryModel>,
    InferCreationAttributes<IFactoryModel>
  > {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  id: CreationOptional<number>;
  sprocketProductionActual: Object;
  sprocketProductionGoal: Object;
  time: Object;
}

const FactoryModel = getConnection().define<IFactoryModel>("factory", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  sprocketProductionActual: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
    field: "sprocket_production_actual",
  },
  sprocketProductionGoal: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
    field: "sprocket_production_goal",
  },
  time: {
    type: DataTypes.ARRAY(DataTypes.DATE),
    allowNull: false,
  },
});

export default FactoryModel;
export { IFactoryModel };
