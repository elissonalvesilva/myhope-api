import Joi from 'joi';

export const UserSchemaCreate = Joi.object({
  name: Joi.string().min(3).required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required(),
});