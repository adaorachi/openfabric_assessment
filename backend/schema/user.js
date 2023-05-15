import Joi from "joi";

const authObj = {
  email: Joi.string().email().trim().required(),
  password: Joi.string().min(3).trim().required(),
};

export const loginSchema = Joi.object({
  ...authObj,
});

export const registerSchema = Joi.object({
  ...authObj,
});
