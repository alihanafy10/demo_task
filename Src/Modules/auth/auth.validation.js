import Joi from "joi";
import { generalRules, levelType} from "../../Utils/index.js";


export const signupAuthSchema = {
  body: Joi.object({
    displayName: Joi.string()
    .min(3)
    .max(20)
    .trim(true)
    .required()
    .messages({
      "string.pattern.base":
        "The name must contain uppercase or lowercase letters or spaces.",
    }),
    phone:generalRules.phone.required(),
    password:generalRules.password.required(),
    experienceYears:Joi.number().min(1).max(50).required(),
    level:Joi.string().valid(...Object.values(levelType)).required(),
    address:Joi.string()
  }),
};
export const signinAuthSchema = {
  body: Joi.object({
    phone:generalRules.phone.required(),
    password:generalRules.password.required(),
  }),
};

export const profileAuthSchema={
  headers:Joi.object({
    token:Joi.string().required(),
      ...generalRules.header
  })
}

