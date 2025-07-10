const express = require('express');
const router = express.Router();
const {getTopSellingProducts} = require('../controllers/topsales.controller'); 

router.get('/', getTopSellingProducts);

module.exports = router;
