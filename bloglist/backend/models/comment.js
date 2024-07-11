const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: String,
  blog: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' },
});

module.exports = mongoose.model('Comment', commentSchema);
