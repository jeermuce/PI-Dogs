const { Dog, Temperament } = require("../db");
const { parseApiDogs } = require("../utils/parseApiDogs");
const { parseDbDog } = require("../utils/parseDbDog");
const { axiosCaller } = require("../utils/axiosCaller");

let dogCache = 0;
let apiCache = 0;

async function getAllDogs(aDogHasBeenCreated) {
    try {
        let dogs = [];
        if (aDogHasBeenCreated) {
            dogCache = 0;
        }

        if (dogCache && !aDogHasBeenCreated) {
            aDogHasBeenCreated = false;
            dogs = dogCache;
            const totalCount = dogs.length;
            return { aDogHasBeenCreated, dogs, totalCount };
        }
        if (apiCache.length > 0) {
            dogs = apiCache;
        } else {
            const response = await axiosCaller("all");
            dogs = parseApiDogs(response.data, "dogs");
            apiCache = dogs;
        }

        let dbDogs = await Dog.findAll({
            attributes: [
                "id",
                "name",
                "image",
                "weight",
                "weight_imperial",
                "height",
                "height_imperial",
                "life_span",
                "source",
            ],
            include: {
                model: Temperament,
                attributes: ["name"],
                through: {
                    attributes: [],
                },
            },
        });
        dbDogs = dbDogs.map((dog) => dog.dataValues);

        const parsedDbDogs = dbDogs.map((dog) => {
            return parseDbDog(dog);
        });

        dogs = [...parsedDbDogs, ...dogs];
        aDogHasBeenCreated = false;
        dogCache = dogs;
        const totalCount = Number(dogCache.length);

        return {
            aDogHasBeenCreated,
            dogs,
            totalCount,
        };
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllDogs,
};
