// src/controllers/category.controller.js

const Category = require('../models/category.model');
const logger = require('../config/logger');
const Joi = require('joi');
const { sendSuccess, sendError } = require('../utils/response.util');

// Joi schema for category validation
const categorySchema = Joi.object({
  name: Joi.string().required().trim(),
  description: Joi.string().trim().optional()
});

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const { error, value } = categorySchema.validate(req.body);
    if (error) return sendError(res, 400, error.details[0].message);

    const existing = await Category.findOne({ name: value.name });
    if (existing) return sendError(res, 400, 'Category name already exists');

    const category = await Category.create(value);
    logger.info(`Category created: ${category._id}`);
    sendSuccess(res, 201, category);
  } catch (err) {
    logger.error(`Error creating category: ${err.message}`);
    sendError(res, 500, 'Server error');
  }
};

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    sendSuccess(res, 200, categories);
  } catch (err) {
    logger.error(`Error fetching categories: ${err.message}`);
    sendError(res, 500, 'Server error');
  }
};

// Get a single category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) return sendError(res, 404, 'Category not found');
    sendSuccess(res, 200, category);
  } catch (err) {
    logger.error(`Error fetching category: ${err.message}`);
    sendError(res, 500, 'Server error');
  }
};

// Update a category
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = categorySchema.validate(req.body);
    if (error) return sendError(res, 400, error.details[0].message);

    const updated = await Category.findByIdAndUpdate(id, value, {
      new: true,
      runValidators: true
    });

    if (!updated) return sendError(res, 404, 'Category not found');
    logger.info(`Category updated: ${id}`);
    sendSuccess(res, 200, updated);
  } catch (err) {
    logger.error(`Error updating category: ${err.message}`);
    sendError(res, 500, 'Server error');
  }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Category.findByIdAndDelete(id);
    if (!deleted) return sendError(res, 404, 'Category not found');
    logger.info(`Category deleted: ${id}`);
    sendSuccess(res, 200, { message: 'Category deleted' });
  } catch (err) {
    logger.error(`Error deleting category: ${err.message}`);
    sendError(res, 500, 'Server error');
  }
};