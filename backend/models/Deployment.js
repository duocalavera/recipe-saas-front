import mongoose from 'mongoose';

const deploymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'active', 'inactive', 'failed'], default: 'pending' },
  lastDeployedAt: { type: Date },
  containerName: { type: String },
  port: { type: Number },
  buildLogs: [{ type: String }],
}, { timestamps: true });

export default mongoose.model('Deployment', deploymentSchema);