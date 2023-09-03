const { Dog, Temperament } = require("../../db");
const { parseDbDog } = require("../../utils/parseDbDog.js");
const { addTemperamentsToDog } = require("../../utils/addTemperamentsToDog.js");

async function createDog(dog, aDogHasBeenCreated) {
    try {
        const {
            name,
            height,
            height_imperial,
            weight,
            weight_imperial,
            life_span,
            image,
            temperaments,
        } = dog;
        if (!name) {
            aDogHasBeenCreated = true;
            let code = 400; //400 Bad Request
            let createdDog = "Name is required";
            return { code, aDogHasBeenCreated, createdDog };
        }
        let [createdDog, isNew] = await Dog.findOrCreate({
            where: {
                name,
            },
            defaults: {
                weight,
                weight_imperial,
                height,
                height_imperial,
                life_span: life_span + " years",
                image,
                source: "database",
            },
            include: {
                model: Temperament,
                through: {
                    attributes: [],
                },
            },
        });

        if (!isNew) {
            aDogHasBeenCreated = true;
            const code = 409; //409 Conflict
            createdDog = parseDbDog(createdDog.dataValues);
            return { code, aDogHasBeenCreated, createdDog };
        }
        await addTemperamentsToDog(createdDog, temperaments);

        createdDog = await Dog.findOne({
            where: {
                name,
            },
            include: {
                model: Temperament,
                attributes: ["name"],
                through: {
                    attributes: [],
                },
            },
        });
        createdDog = parseDbDog(createdDog.dataValues);

        aDogHasBeenCreated = true;
        const code = 201; //201 Created
        return { code, aDogHasBeenCreated, createdDog };
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createDog,
};
