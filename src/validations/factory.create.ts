import Joi from "joi";

const creteFactorySchema: Joi.ObjectSchema = Joi.object()
  .keys({
    pitchDiameter: Joi.number().required(),
    outsideDiameter: Joi.number().required(),
    teeth: Joi.number().required(),
    pitch: Joi.number().required(),
  })
  .unknown();

export { creteFactorySchema };
