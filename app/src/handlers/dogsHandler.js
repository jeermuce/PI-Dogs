const {
    getAllDogs,
    createDog,
    getDogByID,
    getDogByName,
} = require("../controllers/dogsControllers.js");
const { dogBodyParser } = require("../utils/dogBodyParser.js");
let aDogHasBeenCreated = false;
async function getByIdHandler(req, res) {
    try {
        console.log("getByIdHandler");
        const id = req.params.id;
        const dog = await getDogByID(id);
        return res.status(200).json(dog);
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
}

async function createHandler(req, res) {
    try {
        const newDog = await dogBodyParser(req.body);

        const createResults = await createDog(newDog, aDogHasBeenCreated);
        aDogHasBeenCreated = createResults.aDogHasBeenCreated;
        const dog = createResults.createdDog;
        const code = createResults.code;

        return res.status(code).json(dog || createResults.message);
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
}

async function getAllHandler(req, res) {
    try {
        if (req.query.name) {
            return getByNameHandler(req, res);
        }
        const results = await getAllDogs(aDogHasBeenCreated);
        aDogHasBeenCreated = results.aDogHasBeenCreated;
        const dogs = results.dogs;
        const totalCount = results.totalCount;
        return res.status(200).json({ totalCount, dogs });
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
}
async function getByNameHandler(req, res) {
    try {
        const { name } = req.query;
        const { dogs, totalCount } = await getDogByName(name);
        return res.status(200).json({ totalCount, dogs });
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
}

module.exports = {
    createHandler,
    getAllHandler,
    getByIdHandler,
    getByNameHandler,
};
