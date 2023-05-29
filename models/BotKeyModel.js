const mongoose = require('mongoose');

// Define the Schema for the BotKey model
const BotKeySchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true
    },
});

// Create the BotKey model
const BotKey = mongoose.model('BotKey', BotKeySchema);

// Export the BotKey model
module.exports = BotKey;
