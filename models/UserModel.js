// Import Modules
const mongoose = require('mongoose');

// Define the schema for the user model
const userSchema = new mongoose.Schema({
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

// Create the user model
const User = mongoose.model('User', userSchema);

// Export the user model
module.exports = User;
