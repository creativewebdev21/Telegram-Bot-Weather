// Import Subscriber Model
const Subsciber = require('../models/SubscriberModel');

// Define the controller
const subscriberController = (req, res) => {
    Subsciber.find({})
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            console.log('Error: ', error.message);
        });
}

// Export the controller
module.exports = subscriberController;
