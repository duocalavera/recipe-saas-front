import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  ingredients: { type: String, required: true },
  instructions: [{ type: String, required: true }],
  imageUrl: { type: String, required: true },
  category: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Recipe', recipeSchema);