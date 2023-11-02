import Joi from "joi";

export const categoryImageValidatorSchema = Joi.object({
  category: Joi.number().required(),
  imageUrl: Joi.string().required(),
});
