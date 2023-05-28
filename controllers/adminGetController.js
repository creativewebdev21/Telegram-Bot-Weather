// Import Admin Model
const Admin = require('../models/AdminModel');

// Define the controller
const adminController = (req, res) => {
    Admin.find({})
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            console.log('Error: ', error.message);
        });
}

// Export the controller
module.exports = adminController;
