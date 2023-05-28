const mongoose = require('mongoose');

// Define the schema for the Admin Model
const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: [true, 'User already exists'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
});

// Create the Admin model
const Admin = mongoose.model('Admin', adminSchema);

// Export the Admin model
module.exports = Admin;

