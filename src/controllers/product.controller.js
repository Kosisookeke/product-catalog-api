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

const searchProducts = async (req, res) => {
  try {
    const { q, category } = req.query;
    const filter = {};

    if (q) filter.name = { $regex: new RegExp(q, 'i') };
    if (category) filter.category = category;

    const products = await Product.find(filter).populate('category', 'name');
    sendSuccess(res, 200, products);
  } catch (err) {
    logger.error(`Error searching products: ${err.message}`);
    sendError(res, 500, 'Server error');
  }
};

const getLowStockProducts = async (req, res) => {
  try {
    const lowStockProducts = await Product.find({
      $or: [
        { stock: { $lt: 10 } },
        { 'variants.stock': { $lt: 10 } }
      ]
    }).populate('category', 'name');

    sendSuccess(res, 200, lowStockProducts);
  } catch (err) {
    logger.error(`Error fetching low stock products: ${err.message}`);
    sendError(res, 500, 'Server error');
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id).populate('category', 'name');
    if (!product) return sendError(res, 404, 'Product not found');

    sendSuccess(res, 200, product);
  } catch (err) {
    logger.error(`Error fetching product: ${err.message}`);
    sendError(res, 500, 'Server error');
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = productSchema.validate(req.body);
    if (error) return sendError(res, 400, error.details[0].message);

    const updated = await Product.findByIdAndUpdate(id, value, {
      new: true,
      runValidators: true
    }).populate('category', 'name');

    if (!updated) return sendError(res, 404, 'Product not found');

    logger.info(`Product updated: ${id}`);
    sendSuccess(res, 200, updated);
  } catch (err) {
    logger.error(`Error updating product: ${err.message}`);
    sendError(res, 500, 'Server error');
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) return sendError(res, 404, 'Product not found');

    logger.info(`Product deleted: ${id}`);
    sendSuccess(res, 200, { message: 'Product deleted' });
  } catch (err) {
    logger.error(`Error deleting product: ${err.message}`);
    sendError(res, 500, 'Server error');
  }
};

module.exports = {
  getProducts,
  createProduct,
  searchProducts,
  getLowStockProducts,
  getProductById,
  updateProduct,
  deleteProduct
};