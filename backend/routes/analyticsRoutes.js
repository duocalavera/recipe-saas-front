import express from 'express';
import Analytics from '../models/Analytics.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get analytics for a user's blog
router.get('/', auth, async (req, res) => {
  try {
    const analytics = await Analytics.findOne({ user: req.userId })
      .populate('topRecipes.recipe', 'title');
    if (!analytics) {
      return res.status(404).json({ message: 'No analytics found' });
    }
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching analytics' });
  }
});

// Update analytics (this would typically be called by the deployed blog)
router.post('/update', async (req, res) => {
  try {
    const { userId, pageView, uniqueVisitor, recipeId, device } = req.body;

    let analytics = await Analytics.findOne({ user: userId });
    if (!analytics) {
      analytics = new Analytics({ user: userId });
    }

    analytics.pageViews += pageView ? 1 : 0;
    analytics.uniqueVisitors += uniqueVisitor ? 1 : 0;

    if (recipeId) {
      const recipeIndex = analytics.topRecipes.findIndex(r => r.recipe.toString() === recipeId);
      if (recipeIndex > -1) {
        analytics.topRecipes[recipeIndex].views += 1;
      } else {
        analytics.topRecipes.push({ recipe: recipeId, views: 1 });
      }
      analytics.topRecipes.sort((a, b) => b.views - a.views);
      analytics.topRecipes = analytics.topRecipes.slice(0, 10); // Keep only top 10
    }

    if (device) {
      analytics.deviceStats[device] += 1;
    }

    await analytics.save();
    res.json({ message: 'Analytics updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating analytics' });
  }
});

export default router;