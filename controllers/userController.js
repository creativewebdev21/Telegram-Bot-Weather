// Import the User model
const User = require('../models/UserModel');

// Define the controller
const userController = (req, res) => {
    User.find({})
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            console.log('Error: ', error.message);
        });
}

// Export the controller
module.exports = userController;