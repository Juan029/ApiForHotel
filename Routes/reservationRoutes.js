const express = require('express');
const reservationController = require('../Controllers/reservationController.js');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Reservation:
 *       type: object
 *       required:
 *         - guestName
 *         - roomNumber
 *         - checkInDate
 *         - checkOutDate
 *       properties:
 *         guestName:
 *           type: string
 *           description: Nombre del huésped
 *         roomNumber:
 *           type: number
 *           description: Número de la habitación
 *         checkInDate:
 *           type: string
 *           format: date
 *           description: Fecha de entrada
 *         checkOutDate:
 *           type: string
 *           format: date
 *           description: Fecha de salida
 *       example:
 *         guestName: Juan Pérez
 *         roomNumber: 101
 *         checkInDate: 2024-10-15
 *         checkOutDate: 2024-10-20
 */

/**
 * @swagger
 * /api/hotels/{hotelId}/reservations:
 *   post:
 *     summary: Crear una nueva reserva
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: hotelId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del hotel
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservation'
 *     responses:
 *       201:
 *         description: La reserva fue creada exitosamente
 *       400:
 *         description: Conflicto de reserva
 *       500:
 *         description: Error en la creación de la reserva
 */
router.post('/hotels/:hotelId/reservations', reservationController.createReservation);

module.exports = router;
