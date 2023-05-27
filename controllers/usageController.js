// Import the Usage Model
const Usage = require('../models/UsageModel');

// Define the controller
const usageController = (req, res) => {
    Usage.find({})
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            console.log('Error: ', error.message);
        });
}

// Export the controller
module.exports = usageController;