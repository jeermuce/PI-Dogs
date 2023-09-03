const { Router } = require("express");
const {
    createHandler,
    getAllHandler,
    getByIdHandler,
    getByNameHandler,
} = require("../handlers/dogsHandler.js");

const dogsRouter = Router();

dogsRouter.get("/", getAllHandler);
dogsRouter.get("/:id", getByIdHandler);
dogsRouter.get("/?name", getByNameHandler);
dogsRouter.post("/", createHandler);

module.exports = dogsRouter;
