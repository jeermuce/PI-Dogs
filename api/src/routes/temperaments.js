const { Router } = require("express");
const { temperamentsHandler } = require("../handlers/temperamentsHandler.js");

const temperaments = Router();

temperaments.get("/", temperamentsHandler);

module.exports = temperaments;
