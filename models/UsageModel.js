const mongoose = require('mongoose');

// Define the schema for the usage model
const usageSchema = new mongoose.Schema({
    username: {
        type: String,
        // required: true,
    },
    userid: {
        type: Number,
        required: true,
    },
    time: {
        type: Date,
        default: Date.now,
    }
});

// Create the usage model
const Usage = mongoose.model('Usage', usageSchema);

// Export the usage model
module.exports = Usage;
