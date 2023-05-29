// Import the Blocked User Model
const BlockedUser = require('../models/BlockedUserModel');

// Define the controller
const blockedUsersGetController = (req, res) => {
    BlockedUser.find({})
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            console.log('Error: ', error.message);
        });
}

// Export the controller
module.exports = blockedUsersGetController;