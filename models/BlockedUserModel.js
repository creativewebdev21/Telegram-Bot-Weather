const mongoose = require('mongoose');

// Define the Schema for the BlockedUser model
const BlockedUserSchema = new mongoose.Schema({
    userid: {
        type: Number,
        required: true,
        unique: [true, "User already blocked"]
    },
    username: {
        type: String,
    }
});


// Create the BlockedUser model
const BlockedUser = mongoose.model('BlockedUser', BlockedUserSchema);

// Export the BlockedUsers model
module.exports = BlockedUser;