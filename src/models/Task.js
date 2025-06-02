const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  completed: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String }, // bonus feature: category
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' }, // bonus feature: priority levels
  dueDate: { type: Date } // bonus feature: New: due date
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);