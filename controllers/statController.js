// Import Stat Model
const Stat = require('../models/StatModel');

// Define the controller
const statController = (req, res) => {
    Stat.find({})
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            console.log('Error: ', error.message);
        });
}

// Export the controller
module.exports = statController;
