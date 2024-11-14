import Joi from "joi";
import { Types } from "mongoose";

export const generalRules = {
  phone:Joi.string()
  .pattern(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/)
  .messages({
    'string.pattern.base': 'phone number not valid format',
  }),
  password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/)
  .messages({
    'string.pattern.base': 'Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character',
  }),
  header:{
    "content-type":Joi.string().optional(),
    "user-agent":Joi.string().optional(),
    accept:Joi.string().optional(),
    "postman-token":Joi.string().optional(),
    host:Joi.string().optional(),
    "accept-encoding":Joi.string().optional(),
    connection:Joi.string().optional(),
    "content-length":Joi.number().optional(),
},
};

export function objectIdRule(value, helper) {
  const isValidObjectId = Types.ObjectId.isValid(value);
  return isValidObjectId ? value : helper.messages("invalidObjectId");
}
