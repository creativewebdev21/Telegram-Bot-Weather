// Import the Blocked User Model
const BlockedUser = require('../models/BlockedUserModel');

// Define the controller
const blockedUserDeleteController = (req, res) => {
    const userid = req.body.userid;
    BlockedUser.findOneAndDelete({ userid: userid })
        .then((data) => {
            res.json({
                data: data,
                message: 'User unblocked successfully',
            });
        })
        .catch((error) => {
            console.log('Error: ', error.message);
            res.status(401).json({
                message: 'Error unblocking user',
            });
        });
}

// Export the controller
module.exports = blockedUserDeleteController;
