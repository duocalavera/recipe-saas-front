import express from 'express';
import Deployment from '../models/Deployment.js';
import User from '../models/User.js';
import auth from '../middleware/auth.js';
import { generateBlogContent } from '../services/blogGenerator.js';
import { createUserContainer, stopAndRemoveContainer } from '../services/dockerService.js';

const router = express.Router();

// Deploy user's blog
router.post('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a unique subdomain for the user
    const subdomain = user.blogName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const containerName = `blog-${subdomain}`;

    // Generate blog content
    const blogContent = await generateBlogContent(user);

    // Create or update Docker container
    const { port } = await createUserContainer(user, blogContent);

    // Update or create deployment record
    let deployment = await Deployment.findOne({ user: req.userId });
    if (deployment) {
      deployment.status = 'active';
      deployment.lastDeployedAt = new Date();
      deployment.containerName = containerName;
      deployment.port = port;
    } else {
      deployment = new Deployment({
        user: req.userId,
        status: 'active',
        lastDeployedAt: new Date(),
        containerName,
        port
      });
    }

    await deployment.save();

    res.json({ 
      message: 'Deployment successful', 
      url: `https://${subdomain}.recipes.com`,
      port
    });
  } catch (error) {
    console.error('Deployment error:', error);
    res.status(500).json({ message: 'Error during deployment' });
  }
});

// Get deployment status
router.get('/status', auth, async (req, res) => {
  try {
    const deployment = await Deployment.findOne({ user: req.userId });
    if (!deployment) {
      return res.status(404).json({ message: 'No deployment found' });
    }
    res.json(deployment);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching deployment status' });
  }
});

// Undeploy user's blog
router.post('/undeploy', auth, async (req, res) => {
  try {
    const deployment = await Deployment.findOne({ user: req.userId });
    if (!deployment) {
      return res.status(404).json({ message: 'No active deployment found' });
    }

    await stopAndRemoveContainer(deployment.containerName);

    deployment.status = 'inactive';
    await deployment.save();

    res.json({ message: 'Blog undeployed successfully' });
  } catch (error) {
    console.error('Undeployment error:', error);
    res.status(500).json({ message: 'Error during undeployment' });
  }
});

export default router;