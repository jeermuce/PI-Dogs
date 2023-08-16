const { Router } = require("express");
const { createHandler, getAllHandler } = require("../handlers/dogsHandler");

const dogsRouter = Router();

dogsRouter.get("/", getAllHandler);
dogsRouter.post("/", createHandler);

module.exports = dogsRouter;
