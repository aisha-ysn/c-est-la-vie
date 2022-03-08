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

})

module.exports = entrySchema;