import Joi from "joi";
import { generalRules, objectIdRule, priorityType } from "../../Utils/index.js";

export const createTodoSchema={
    headers:Joi.object({
      authorization:Joi.string().required(),
        ...generalRules.header
    }),
    body: Joi.object({
      image:Joi.string().required(),
      title: Joi.string().required(),
      desc: Joi.string().required(),
      priority:Joi.string().valid(...Object.values(priorityType)).required(),
      dueDate:Joi.date().required(),
    })
  }
export const listTodoSchema={
    headers:Joi.object({
      authorization:Joi.string().required(),
        ...generalRules.header
    }),
    query: Joi.object({
      page: Joi.string(),
    })
  }
export const oneTodoSchema={
    headers:Joi.object({
      authorization:Joi.string().required(),
        ...generalRules.header
    }),
    params: Joi.object({
        _id:Joi.string().custom(objectIdRule).required()
    })
  }