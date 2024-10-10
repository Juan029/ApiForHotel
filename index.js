const express = require('express');
const mongoose = require('mongoose');
const config = require('./Config/config.json');
const hotelRoutes = require('./Routes/hotelRoutes');
const reservationRoutes = require('./Routes/reservationRoutes');

const app = express();

app.use(express.json());

mongoose.connect(config.database.mongodb.uri, config.database.mongodb.options)
    .then(() => console.log(config.logs.successMessage))
    .catch(err => console.error(config.logs.errorMessage, err));

// Rutas
app.use('/api', hotelRoutes);
app.use('/api', reservationRoutes);

app.get('/', (req, res) => {
    res.send('Servidor Local Activo');
});

app.listen(config.server.port, () => {
    console.log(`The server is running on http://${config.server.host}:${config.server.port}`);
});

module.exports = app;
