// Import the BotKey Model
const BotKey = require('../models/BotKeyModel');

// Define the controller
const botKeyController = (req, res) => {
    const botkey = req.body.botkey;
    BotKey.findOneAndUpdate({}, { $set: { key: botkey } }, { upsert: true, new: true })
}

// Export the controller
module.exports = botKeyController;
