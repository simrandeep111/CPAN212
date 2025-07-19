// models/Recipe.js
const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
    ingredients: { type: [String], required: true },
    steps: { type: [String], required: true }
});

module.exports = mongoose.model('Recipe', RecipeSchema);
