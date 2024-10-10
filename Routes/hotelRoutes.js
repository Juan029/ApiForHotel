const express = require('express');
const hotelController = require('../Controllers/hotelController.js');
const router = express.Router();

router.post('/hotels', hotelController.createHotel);
router.get('/hotels', hotelController.listHotels);

module.exports = router;
