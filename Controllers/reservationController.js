const Reservation = require('../Models/modelReservation.js');

// Crear la reserva del hotel
exports.createReservation = async (req, res) => {
    try {
        const { guestName, roomNumber, checkInDate, checkOutDate } = req.body;
        const hotelId = req.params.hotelId;

        // Aqui vamos a verificar si de pronto ya existe una reserva en la misma fecha para la misma habitacion, aplicamos Conflict y findOne
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

        //Aqui vamos a crear nuestra nueva reservación de hotel
        const reservation = new Reservation({
            guestName,
            roomNumber,
            checkInDate,
            checkOutDate,
            hotel: hotelId
        });

        await reservation.save();
        res.status(201).json({ message: "Reservación creada exitosamente", reservation });
    } catch (error) {
        res.status(500).json({ message: "Error creando la reservación", error });
    }
};

// Vamos a listar las reservas de un hotel
exports.listReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find({ hotel: req.params.hotelId });
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ message: "Error listando reservas", error });
    }
};

// Aqui realizamos la Cancelación de la reserva
exports.cancelReservation = async (req, res) => {
    try {
        const { reservationID } = req.body;
        const reservation = await Reservation.findByIdAndUpdate(reservationID, { status: "Cancelada" }, { new: true });
        res.status(200).json({ message: "La reservación ha sido cancelada exitosamente", reservation });
    } catch (error) {
        res.status(500).json({ message: "Error cancelando la reservación", error });
    }
};
