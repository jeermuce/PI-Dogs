const { getDogById } = require("./getDogById");
const { getDogByName } = require("./getDogByName");
const { createDog } = require("./createDog");
const { getAllDogs } = require("./getAllDogs");

module.exports = {
    getAllDogs,
    createDog,
    getDogById,
    getDogByName,
};
