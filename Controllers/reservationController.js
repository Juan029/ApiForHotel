const Reservation = require('../Models/modelReservation.js');
const fetch = require('node-fetch');

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
    } catch (error) {
        console.error('Error fetching random user data:', error);
        return null;
    }
}

exports.createReservation = async (req, res) => {
    try {
        const { guestName, roomNumber, checkInDate, checkOutDate } = req.body;
        const hotelId = req.params.hotelId;

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

        const guestInfo = await getRandomUserData();

        const reservation = new Reservation({
            guestName,
            roomNumber,
            checkInDate,
            checkOutDate,
            hotel: hotelId,
            guestInfo: guestInfo
        });

        await reservation.save();

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

exports.listReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find({ hotel: req.params.hotelId });
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ message: "Error listando reservaciones", error });
    }
};

exports.cancelReservation = async (req, res) => {
    try {
        const { reservationId } = req.params;
        const reservation = await Reservation.findByIdAndUpdate(reservationId, { status: "Cancelada" }, { new: true });
        if (!reservation) {
            return res.status(404).json({ message: "La reservación no fue encontrada" });
        }
        res.status(200).json({ message: "La reservación ha sido cancelada exitosamente", reservation });
    } catch (error) {
        res.status(500).json({ message: "Error cancelando la reservación", error });
    }
};