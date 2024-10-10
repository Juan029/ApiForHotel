const express = require('express');
const mongoose = require('mongoose');
const config = require('./Config/config.json');

const index = express();

index.use(express.json());

mongoose.connect(config.database.mongodb.uri, config.database.mongodb.options)
    .then(() => console.log(config.logs.successMessage))
    .catch(err => console.error(config.logs.errorMessage, err));

    index.get('/', (req, res) => {
        res.send('Servidor Local Activo');
    });

    index.listen(config.server.port, () => {
        console.log(`The server is running on the port http://${config.server.host}:${config.server.port}`);
    });


    
    



    module.exports = index;