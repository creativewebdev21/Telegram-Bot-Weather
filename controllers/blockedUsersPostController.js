// Import the Blocked User Model
const BlockedUser = require('../models/BlockedUserModel');
const Subscriber = require('../models/SubscriberModel');

// Define the controller
const blockedUsersPostController = (req, res) => {
    userid = req.body.userid;
    username = req.body.username;

    Subscriber.findOneAndDelete({ userid: userid })
        .then((data) => {
            const Blocked = new BlockedUser({
                userid: userid,
                username: username
            });

            Blocked.save()
                .then((data) => {
                    res.status(200).json({
                        dsta: data,
                        message: 'User blocked successfully',
                    });
                })
                .catch((error) => {
                    console.log('Error: ', error.message);
                    res.status(401).json({
                        message: 'Error blocking user',
                    });
                });
        })
        .catch((error) => {
            console.log('Error: ', error.message);
            res.status(401).json({
                message: 'Error unsubscribing user',
            });
        });
}

// Export the controller
module.exports = blockedUsersPostController;
