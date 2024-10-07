import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  blogName: { type: String, default: 'My Recipe Blog' },
  selectedTheme: { type: String, default: 'modernMinimalist' },
  billingPlan: {
    type: String,
    enum: ['free', 'basic', 'pro', 'enterprise'],
    default: 'free'
  },
  subscriptionStatus: {
    type: String,
    enum: ['active', 'inactive', 'cancelled'],
    default: 'inactive'
  },
  subscriptionEndDate: { type: Date },
  stripeCustomerId: { type: String },
}, { timestamps: true });

export default mongoose.model('User', userSchema);