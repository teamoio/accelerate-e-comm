import Joi from "joi";

export const userValidatorSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])"))
    .message(
      "The password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character."
    )
    .required(),
  status: Joi.string().required(),
  is_admin: Joi.boolean().required(),
});
