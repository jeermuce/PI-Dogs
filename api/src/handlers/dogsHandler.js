const {
    getAllDogs,
    createDog,
    getDogById,
    getDogByName,
} = require("../controllers/dogsController.js");
const { dogBodyParser } = require("../utils/dogBodyParser.js");
async function getByIdHandler(req, res) {
    try {
        const id = req.params.id;
        const dog = await getDogById(id);
        res.status(200).json(dog);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

async function createHandler(req, res) {
    try {
        let dog = await dogBodyParser(req.body);
        dog = await createDog(dog);
        res.status(201).json(dog);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

async function getAllHandler(req, res) {
    try {
        if (req.query.name) {
            return getByNameHandler(req, res);
        }
        const order = req.query.order || "name";
        const orderDirection = order.startsWith("-") ? "DESC" : "ASC";
        const orderBy = order.startsWith("-") ? order.slice(1) : order;
        const page = req.query.page || 1;
        const limit = req.query.limit || 8;
        let dogs = await getAllDogs(orderBy, orderDirection, page, limit);

        return res.status(200).json(dogs);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}
async function getByNameHandler(req, res) {
    try {
        const name = req.query.name;
        const dog = await getDogByName(name);
        res.status(200).json(dog);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

module.exports = {
    createHandler,
    getAllHandler,
    getByIdHandler,
    getByNameHandler,
};