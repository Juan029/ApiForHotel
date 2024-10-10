const express = require('express');
const mongoose = require('mongoose');
const config = require('./Config/config.json');
const hotelRoutes = require('./Routes/hotelRoutes.js');
const reservationRoutes = require('./Routes/reservationRoutes.js');
const { swaggerUi, swaggerSpec } = require('./swagger.js'); 

const app = express();

app.use(express.json());

mongoose.connect(config.database.mongodb.uri, config.database.mongodb.options)
    .then(() => console.log(config.logs.successMessage))
    .catch(err => console.error(config.logs.errorMessage, err));


    //MAKE IT WORK, THEN MAKE IT GOOD

// Ruta Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas de API
app.use('/api', hotelRoutes);
app.use('/api', reservationRoutes);

app.get('/', (req, res) => {
    res.send('Servidor Local Activo');
});

app.listen(config.server.port, () => {
    console.log(`The server is running on http://${config.server.host}:${config.server.port}`);
});

module.exports = app;
