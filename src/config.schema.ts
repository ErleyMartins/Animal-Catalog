import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  // APP
  PORT: Joi.number().default(3000).required(),

  // DATA BASE
  MYSQL_HOST: Joi.string().required(),
  MYSQL_PORT: Joi.number().default(3306).required(),
  MYSQL_USER: Joi.string().required(),
  MYSQL_PASSWORD: Joi.string().required(),

  // JWT
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRATION_TIME: Joi.string().required(),
});
