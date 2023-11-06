import Joi from "joi";

export const productValidatorSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  quantity: Joi.number().required(),
  price: Joi.number().required(),
  status: Joi.string().required(),
  is_active: Joi.boolean().required(),
  category: Joi.number().required(),
});
