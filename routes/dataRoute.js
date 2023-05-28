// Import and Initialize express router
const express = require('express');
const userController = require('../controllers/userController');
const subscriberController = require('../controllers/subscriberController');
const statController = require('../controllers/statController');
const usageController = require('../controllers/usageController');
const adminGetController = require('../controllers/adminGetController');
const adminPostController = require('../controllers/adminPostController');


const router = express.Router();

// GET route for the homepage
router.get('/', (req, res) => {
    res.send('Hi from Rajesh!');
});

// GET route for the Users Data
router.get('/users', userController);

// Get route for the Subscribers Data
router.get('/subscribers', subscriberController);

// Get route for the Stats Data
router.get('/stats', statController);

// Get route for the Usage Data
router.get('/usage', usageController);

// Get route for the Admin data
router.get('/admin/all', adminGetController);

// Post route for the Admin Authentication
router.post('/admin/auth', adminPostController);


// Export the router
module.exports = router;
