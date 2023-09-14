const { getDogByID } = require("./dogsControllers/getDogByID");
const { getDogByName } = require("./dogsControllers/getDogByName");
const { createDog } = require("./dogsControllers/createDog");
const { getAllDogs } = require("./dogsControllers/getAllDogs");

module.exports = {
    getAllDogs,
    createDog,
    getDogByID,
    getDogByName,
};
