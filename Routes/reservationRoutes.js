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

/**
 * @swagger
 * /api/hotels/{hotelId}/reservations:
 *   get:
 *     summary: Listar todas las reservas de un hotel
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: hotelId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del hotel
 *     responses:
 *       200:
 *         description: Lista de reservas
 *       500:
 *         description: Error al listar las reservas
 */
router.get('/hotels/:hotelId/reservations', reservationController.listReservations);

/**
 * @swagger
 * /api/hotels/{hotelId}/reservations/{reservationId}:
 *   patch:
 *     summary: Cancelar una reserva
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: hotelId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del hotel
 *       - in: path
 *         name: reservationId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la reserva
 *     responses:
 *       200:
 *         description: La reserva fue cancelada exitosamente
 *       404:
 *         description: Reserva no encontrada
 *       500:
 *         description: Error al cancelar la reserva
 */
router.patch('/hotels/:hotelId/reservations/:reservationId', reservationController.cancelReservation);

module.exports = router;