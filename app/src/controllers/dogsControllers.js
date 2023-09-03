const { getDogById } = require("./dogsControllers/getDogById.js");
const { getDogByName } = require("./dogsControllers/getDogByName.js");
const { createDog } = require("./dogsControllers/createDog.js");
const { getAllDogs } = require("./dogsControllers/getAllDogs.js");

module.exports = {
    getAllDogs,
    createDog,
    getDogById,
    getDogByName,
};
