const express = require('express');
const router = express.Router();
const {getUsers,createUser, updateUserProfile, getUserProfile} = require('../controllers/user.controller');
const {authenticate} = require("../middleware/auth.middleware")
const {authorize} = require("../middleware/role.middleware");

router.get('/getusers', authenticate, authorize("admin"), getUsers);
router.post('/createuser', createUser("user"));
router.post('/createadmin', authenticate, authorize("admin"), createUser("admin"));
router.put('/updateprofile', authenticate, authorize("user"), updateUserProfile);
router.get('/getprofile', authenticate, authorize("user"), getUserProfile);
// authenticate, authorize("admin"),
module.exports = router; 