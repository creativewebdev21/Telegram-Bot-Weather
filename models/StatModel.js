const mongoose = require('mongoose');

// Define the schema for the Stat Model
const statSchema = new mongoose.Schema({
    username: {
        type: String,
        // required: true,
    },
    userid: {
        type: Number,
        required: true,
        unique: [true, 'User already exists'],
    },
    count: {
        type: Number,
        required: true,
        default: 0,
    },
});

// Create the Stat model
const Stat = mongoose.model('Stat', statSchema);

// Export the Stat model
module.exports = Stat;