import express from 'express';
import User from '../models/User.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get user's current theme
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({ theme: user.selectedTheme });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching theme' });
  }
});

// Update user's theme
router.put('/', auth, async (req, res) => {
  try {
    const { theme } = req.body;
    const user = await User.findByIdAndUpdate(req.userId, { selectedTheme: theme }, { new: true });
    res.json({ theme: user.selectedTheme });
  } catch (error) {
    res.status(500).json({ message: 'Error updating theme' });
  }
});

export default router;