const {
    getAllDogs,
    createDog,
    getDogById,
    getDogByName,
} = require("../controllers/dogsControllers.js");
const { dogBodyParser } = require("../utils/dogBodyParser.js");
let aDogHasBeenCreated = false;
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

        dog = await createDog(dog, aDogHasBeenCreated);
        aDogHasBeenCreated = dog.aDogHasBeenCreated;
        doggo = dog.createdDog;
        res.status(dog.code).json(doggo);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

async function getAllHandler(req, res) {
    try {
        if (req.query.name) {
            return getByNameHandler(req, res);
        }
        const newSort = req.query.newSort || false;
        const order = req.query.order || "name";
        const orderDirection = order.startsWith("-") ? "DESC" : "ASC";
        const orderBy = order.startsWith("-") ? order.slice(1) : order;
        let dogs = await getAllDogs(
            orderBy,
            orderDirection,
            newSort,
            aDogHasBeenCreated
        );
        aDogHasBeenCreated = dogs.aDogHasBeenCreated;
        dogs = dogs.dogs;

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
