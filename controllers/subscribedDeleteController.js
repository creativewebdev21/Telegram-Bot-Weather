// Import the Subscriber Model
const Subsciber = require('../models/SubscriberModel');

// Define the controller
const subscriberDeleteController = (req, res) => {
    const userid = req.body.userid;
    Subsciber.findOneAndDelete({ userid: userid })
        .then((data) => {
            console.log(data);
            res.status(200).json({
                data: data,
                message: 'User unsubscribed successfully',
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
module.exports = subscriberDeleteController;
