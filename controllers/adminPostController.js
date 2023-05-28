// Import Admin Model
const Admin = require('../models/AdminModel');

// Define the controller
const adminController = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    Admin.find({ username: username })
        .then((data) => {
            // console.log('Data Found: ', data);
            if (data.length === 0 || data[0].password !== password) {
                res.status(401).json({ message: 'Invalid' });
            } else {
                res.status(200).json({ message: 'Success' });
            }
        })
        .catch((error) => {
            console.log('Error: ', error.message);
            res.status(500).json({ message: 'Error' });
        });
}

// Export the controller
module.exports = adminController;
