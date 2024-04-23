const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const issueSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true // Adding an index if this field is often queried
    },
    upvotedBy: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    downvotedBy: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    issueVotes: {
        type: Number,
        default: 0
    },
    postDate: {
        type: Date,
        default: Date.now, // Use the Date.now function directly
        index: true // Adding an index if this field is often queried
    }
});

module.exports = mongoose.model('Issue', issueSchema);