const mongoose = require('mongoose');

const {infoDB} = require('..//Config/config.json');

const {Schema} = mongoose;


const Infohotel = new Schema({
    name: {
        type: String,
        required: true
    },

    location: {
        type: String,
        require: true
    }
});


const hotel = infoDB.model('hotel', Infohotel);

module.exports = hotel;

