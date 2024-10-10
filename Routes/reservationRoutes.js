const express = require('express');
const reservationController = require('../Controllers/reservationController.js');
const router = express.Router();

router.post('/hotels/:hotelId/reservations', reservationController.createReservation);
router.get('/hotels/:hotelId/reservations', reservationController.listReservations);
router.patch('/cancelReservation', reservationController.cancelReservation);

module.exports = router;
