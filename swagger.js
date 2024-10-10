const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Configuración básica para swagger-jsdoc
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'API about a hotel reservation',
        version: '1.0.0',
        description: 'Documentación de la API para gestionar hoteles y reservas'
    },
    servers: [
        {
            url: 'http://localhost:5002',
            description: 'Servidor local'
        }
    ]
};

// generar el doumento
const options = {
    swaggerDefinition,
    apis: ['./Routes/*.js'],  // ubicacion de nuestro archivo
};

// Inicializamos el swagger
const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerSpec };
