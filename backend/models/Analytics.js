import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pageViews: { type: Number, default: 0 },
  uniqueVisitors: { type: Number, default: 0 },
  topRecipes: [{ 
    recipe: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
    views: { type: Number, default: 0 }
  }],
  deviceStats: {
    desktop: { type: Number, default: 0 },
    mobile: { type: Number, default: 0 },
    tablet: { type: Number, default: 0 }
  },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Analytics', analyticsSchema);