import factorySeed from "../test_files/seed_factory_data.json";
import spRocketSeed from "../test_files/seed_sprocket_types.json";
import { FactoryModel, SpRocketModel } from "./models";
import { logger } from "../utils";

type IFactory = {
  sprocket_production_actual: [Number];
  sprocket_production_goal: [Number];
  time: [Number];
};

type IFactorySeed = {
  sprocketProductionActual: [Number];
  sprocketProductionGoal: [Number];
  time: [Number];
};

type ISpRocket = {
  pitch_diameter: Number;
  teeth: Number;
  outside_diameter: Number;
  pitch: Number;
};

const checkAndInsertData = async () => {
  try {
    const factoriesCount = await FactoryModel.count();
    if (factoriesCount === 0) {
      const data: IFactorySeed[] = [];
      logger.info("Factories data is not found, inserting....");
      factorySeed.factories.forEach(({ factory }: any) => {
        const {
          sprocket_production_actual,
          sprocket_production_goal,
          time,
        }: IFactory = factory.chart_data;
        data.push({
          sprocketProductionActual: sprocket_production_actual,
          sprocketProductionGoal: sprocket_production_goal,
          time,
        });
      });
      await FactoryModel.bulkCreate(data);
      logger.info("Factories data created");
    } else {
      logger.info("Factories data found, skipping....");
    }
    const spRocketsCount = await SpRocketModel.count();
    if (spRocketsCount === 0) {
      const data1: any[] = [];
      logger.info("sprockets data is not found, inserting....");
      spRocketSeed.sprockets.forEach(
        ({ pitch_diameter, outside_diameter, teeth, pitch }: ISpRocket) => {
          data1.push({
            pitchDiameter: pitch_diameter,
            outsideDiameter: outside_diameter,
            teeth,
            pitch,
          });
        },
      );
      await SpRocketModel.bulkCreate(data1);
      logger.info("sprockets data created");
    } else {
      logger.info("sprockets data found, skipping....");
    }
  } catch (error) {
    logger.error("checkAndInsertData:", error);
  }
};

export { checkAndInsertData };
