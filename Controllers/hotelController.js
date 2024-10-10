const Hotel = require('../Models/modelHotel.js');

// Crear el hotel
exports.createHotel = async (req, res) => {
    try {
        const { name, location } = req.body;
        const hotel = new Hotel({ name, location });
        await hotel.save();
        res.status(201).json({ message: "Hotel creado exitosamente", hotel });
    } catch (error) {
        res.status(500).json({ message: "Error creando el hotel", error });
    }
};

// Listar los hoteles que hay
exports.listHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find();
        res.status(200).json(hotels);
    } catch (error) {
        res.status(500).json({ message: "Error listando hoteles", error });
    }
};
