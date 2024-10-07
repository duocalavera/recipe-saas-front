import express from 'express';
import Recipe from '../models/Recipe.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get all recipes for a user
router.get('/', auth, async (req, res) => {
  try {
    const recipes = await Recipe.find({ user: req.userId });
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipes' });
  }
});

// Create a new recipe
router.post('/', auth, async (req, res) => {
  try {
    const newRecipe = new Recipe({ ...req.body, user: req.userId });
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(500).json({ message: 'Error creating recipe' });
  }
});

// Update a recipe
router.put('/:id', auth, async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    if (!updatedRecipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json(updatedRecipe);
  } catch (error) {
    res.status(500).json({ message: 'Error updating recipe' });
  }
});

// Delete a recipe
router.delete('/:id', auth, async (req, res) => {
  try {
    const deletedRecipe = await Recipe.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!deletedRecipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting recipe' });
  }
});

export default router;