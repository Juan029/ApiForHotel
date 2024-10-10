const mongoose = require('mongoose');
const { Schema } = mongoose;

const reservationSchema = new Schema({
    guestName: {
        type: String,
        required: true
    },
    roomNumber: {
        type: Number,
        required: true
    },
    checkInDate: {
        type: Date,
        required: true
    },
    checkOutDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (v) {
                return v > this.checkInDate;
            },
            message: 'La fecha del check-out debe ser mayor que la del check-in por favor'
        }
    },
    status: {
        type: String,
        enum: ["Confirmada", "Cancelada"],
        default: "Confirmada"
    },
    hotel: {
        type: Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true
    }
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
