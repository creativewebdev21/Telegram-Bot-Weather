// Import and Initialize express router
const express = require('express');
const userController = require('../controllers/userController');
const subscriberGetController = require('../controllers/subscriberGetController');
const statController = require('../controllers/statController');
const usageController = require('../controllers/usageController');
const adminGetController = require('../controllers/adminGetController');
const adminPostController = require('../controllers/adminPostController');
const botKeyController = require('../controllers/botKeyController');
const blockedUsersGetController = require('../controllers/blockedUsersGetController');
const blockedUsersPostController = require('../controllers/blockedUsersPostController');
const blockedUsersDeleteController = require('../controllers/blockedUsersDeleteController');
const subscriberDeleteController = require('../controllers/subscribedDeleteController');


const router = express.Router();

// GET route for the homepage
router.get('/', (req, res) => {
    res.send('Hi from Rajesh!');
});

// GET route for the Users Data
router.get('/users', userController);

// Get route for the Subscribers Data
router.get('/subscribers', subscriberGetController);

// Delete route for the Subscribers Data
router.delete('/subscribers', subscriberDeleteController);

// Get route for the Stats Data
router.get('/stats', statController);

// Get route for the Usage Data
router.get('/usage', usageController);

// Get route for the Admin data
router.get('/admin/all', adminGetController);

// Post route for the Admin Authentication
router.post('/admin/auth', adminPostController);

// Put route for the BotKey Update
router.put('/admin/botkey', botKeyController);

// Get route for the Blocked Users Data
router.get('/admin/blocked', blockedUsersGetController);

// Post route for the Blocked Users Data
router.post('/admin/blocked', blockedUsersPostController);

// Delete route for the Blocked Users Data
router.delete('/admin/blocked', blockedUsersDeleteController);



// Export the router
module.exports = router;
