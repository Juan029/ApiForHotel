const express = require('express');
const hotelController = require('../Controllers/hotelController.js');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Hotel:
 *       type: object
 *       required:
 *         - name
 *         - location
 *       properties:
 *         name:
 *           type: string
 *           description: El nombre del hotel
 *         location:
 *           type: string
 *           description: La ubicación del hotel
 *       example:
 *         name: Hotel Maravilla
 *         location: Av. Siempre Viva 123
 */

/**
 * @swagger
 * /api/hotels:
 *   post:
 *     summary: Crear un nuevo hotel
 *     tags: [Hoteles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Hotel'
 *     responses:
 *       201:
 *         description: El hotel fue creado con éxito
 *       500:
 *         description: Error en la creación del hotel
 */
router.post('/hotels', hotelController.createHotel);

/**
 * @swagger
 * /api/hotels:
 *   get:
 *     summary: Listar todos los hoteles
 *     tags: [Hoteles]
 *     responses:
 *       200:
 *         description: Lista de hoteles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Hotel'
 *       500:
 *         description: Error al obtener los hoteles
 */
router.get('/hotels', hotelController.listHotels);

module.exports = router;
