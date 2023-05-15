import Joi from "joi";

const categoryList = ["food", "wears", "gadgets"];

export const createProductSchema = Joi.object({
  title: Joi.string().trim().required(),
  desc: Joi.string().trim().required(),
  category: Joi.string()
    .valid(...categoryList)
    .required(),
  imageUrl: Joi.string().trim().required(),
  price: Joi.number().required(),
});

export const editProductSchema = Joi.object({
  id: Joi.string().trim().max(128).required(),
  title: Joi.string().trim().required(),
  desc: Joi.string().trim().required(),
  category: Joi.string()
    .valid(...categoryList)
    .required(),
  imageUrl: Joi.string().trim().required(),
  price: Joi.number().required(),
});
