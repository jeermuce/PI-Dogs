const { getDogByID } = require("./getDogByID");
const { getDogByName } = require("./getDogByName");
const { createDog } = require("./createDog");
const { getAllDogs } = require("./getAllDogs");

module.exports = {
    getAllDogs,
    createDog,
    getDogByID,
    getDogByName,
};
