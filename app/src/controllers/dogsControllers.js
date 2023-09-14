const { getDogById } = require("./getDogById.js");
const { getDogByName } = require("./getDogByName.js");
const { createDog } = require("./createDog.js");
const { getAllDogs } = require("./getAllDogs.js");

module.exports = {
    getAllDogs,
    createDog,
    getDogById,
    getDogByName,
};
