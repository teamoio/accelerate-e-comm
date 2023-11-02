import Joi from "joi";

export const categoryValidatorSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  is_active: Joi.boolean().required(),
});
