const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentsSchema = new Schema({
  comment: {
    type: String,
    required: true,
    maxlength: 500, // Example of adding a maximum length
  },
  issue: {
    type: Schema.Types.ObjectId,
    ref: 'Issue',
    required: true,
    index: true, // Adding an index for faster querying
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true, // Adding an index here as well
  },
}, { timestamps: true }); // Enabling timestamps to automatically manage createdAt and updatedAt fields

module.exports = mongoose.model('Comments', commentsSchema);