const mongoose = require('mongoose');

const {infoDB} = require('..//Config/config.json');

const {Schema} = mongoose;


const theReservations = new Schema({
    guestName: {
        type: String,
        required: true
    },

    roomNumber: {
        type: Number,
        require: true
    },

    checkInDate: {
        type: Date,
        require: true
    },

    checkOutDate : {
        type: Date,
        require: true
    },

    Status : {
        type: String,
        enum: ["Disponible", "No disponible"],
        require: true
    },

});


const reservations = infoDB.model('reservations', theReservations);

module.exports = reservations;

