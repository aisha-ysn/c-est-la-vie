const { Schema } = require('mongoose');

const entrySchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    timeStamp: {
        type: Date,
        default: Date.now,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
})

module.exports = entrySchema;