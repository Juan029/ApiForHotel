const Reservation = require('../Models/modelReservation.js');
const fetch = require('node-fetch');

// aqui hacemos uso del api para traer la info de la persona
async function getRandomUserData() {
    try {
        const response = await fetch('https://randomuser.me/api/');
        const data = await response.json();
        const user = data.results[0];
        return {
            email: user.email,
            phone: user.phone,
            location: {
                city: user.location.city,
                country: user.location.country
            }
        };
        // En caso de que falle la información que trae del usuario ramdom
    } catch (error) {
        console.error('Error fetching random user data:', error);
        return null;
    }
}

// creamos la reserva que se le hace al hotel
exports.createReservation = async (req, res) => {
    try {
        const { guestName, roomNumber, checkInDate, checkOutDate } = req.body;
        const hotelId = req.params.hotelId;

        // Realizamos la Verificación de que si ya existe una reservación en la misma fecha para la misma habitación
        const conflict = await Reservation.findOne({
            hotel: hotelId,
            roomNumber,
            $or: [
                { checkInDate: { $lt: checkOutDate, $gte: checkInDate } },
                { checkOutDate: { $gt: checkInDate, $lte: checkOutDate } }
            ]
        });

        if (conflict) {
            return res.status(400).json({ message: "La habitación seleccionada ya está reservada para esa fecha." });
        }

        // traemos la información que falte del User mediante la Api  
        const guestInfo = await getRandomUserData();

        // aqui creamos una nueva reservación de hotel
        const reservation = new Reservation({
            guestName,
            roomNumber,
            checkInDate,
            checkOutDate,
            hotel: hotelId,
            guestInfo: guestInfo // traemos la info que falta del usuario (constante de arriba guestInfo)
        });

        await reservation.save();

        // organizamos todo lo que nos responderá
        const response = {
            guestName: reservation.guestName,
            roomNumber: reservation.roomNumber,
            checkInDate: reservation.checkInDate,
            checkOutDate: reservation.checkOutDate,
            guestInfo: reservation.guestInfo
        };

        res.status(201).json({ message: "La reservación ha sido creada exitosamente", reservation: response });
    } catch (error) {
        res.status(500).json({ message: "Error creando la reservación", error });
    }
};

// Listar las reservaciones que hay en un hotel
exports.listReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find({ hotel: req.params.hotelId });
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ message: "Error listando reservas", error });
    }
};

// Cancelación de la reservación
exports.cancelReservation = async (req, res) => {
    try {
        const { reservationID } = req.body;
        const reservation = await Reservation.findByIdAndUpdate(reservationID, { status: "Cancelada" }, { new: true });
        res.status(200).json({ message: "La reservación ha sido cancelada exitosamente", reservation });
    } catch (error) {
        res.status(500).json({ message: "Error cancelando la reservación", error });
    }
};