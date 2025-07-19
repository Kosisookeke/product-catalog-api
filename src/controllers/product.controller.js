const Product = require('../models/product.model');
const Category = require('../models/category.model');
const logger = require('../config/logger');
const Joi = require('joi');
const { sendSuccess, sendError } = require('../utils/response.util');

const variantSchema = Joi.object({
  color: Joi.string().optional(),
  size: Joi.string().optional(),
  price: Joi.number().positive().required(),
  stock: Joi.number().integer().min(0)
});

const productSchema = Joi.object({
  name: Joi.string().required().trim(),
  description: Joi.string().optional(),
  price: Joi.number().positive().required(),
  stock: Joi.number().integer().min(0),
  category: Joi.string().hex().length(24).required(),
  variants: Joi.array().items(variantSchema),
  discount: Joi.number().min(0).max(100)
});

const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category', 'name');
    sendSuccess(res, 200, products);
  } catch (err) {
    logger.error(`Error fetching products: ${err.message}`);
    sendError(res, 500, 'Server error');
  }
};

const createProduct = async (req, res) => {
  try {
    const { error, value } = productSchema.validate(req.body);
    if (error) return sendError(res, 400, error.details[0].message);

    const category = await Category.findById(value.category);
    if (!category) return sendError(res, 404, 'Category not found');

    const product = await Product.create(value);
    logger.info(`Product created: ${product._id}`);
    sendSuccess(res, 201, product);
  } catch (err) {
    logger.error(`Error creating product: ${err.message}`);
    sendError(res, 500, 'Server error');
  }
};

module.exports = {
  getProducts,
  createProduct
};