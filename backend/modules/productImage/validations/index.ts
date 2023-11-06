import Joi from "joi";

export const productImageValidatorSchema = Joi.object({
  product: Joi.number().required(),
  imageUrl: Joi.string().required(),
});
