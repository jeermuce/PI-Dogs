const { Dog, Temperament } = require("../../db");
const { parseApiDogs } = require("../../utils/parseApiDogs");
const { parseDbDog } = require("../../utils/parseDbDog");
const { axiosCaller } = require("../../utils/axiosCaller");
const { sorter } = require("../../utils/sorter");

let dogCache = {};
let apiCache = {};
let isFirstRun = true;

async function getAllDogs(orderBy, orderDirection, sort, aDogHasBeenCreated) {
    try {
        let cacheKey = `${orderBy}-${orderDirection}`;

        let dogs = [];
        if (aDogHasBeenCreated) {
            dogCache = {};
        }
        if (sort) {
            //so long as sort == anything truthy
            aDogHasBeenCreated = true;
            dogCache = {};
            apiCache = {};
        }

        allDataFrom = "db and api";
        if (!isFirstRun && !aDogHasBeenCreated) {
            allDataFrom = "dogsCache";
            aDogHasBeenCreated = false;
            dogs = dogCache[cacheKey];
            return { aDogHasBeenCreated, dogs };
        } else if (apiCache[cacheKey]) {
            apiDataFrom = "apiCache";
            dogs = apiCache[cacheKey];
        } else {
            const response = await axiosCaller("all");
            dogs = parseApiDogs(response.data, "dogs");
            apiCache[cacheKey] = dogs;
            apiDataFrom = "api";
            isFirstRun = false;
        }

        let dbDogs = await Dog.findAll({
            order: [[orderBy, orderDirection]],
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

        parsedDbDogs.sort(sorter);
        dogs.sort(sorter);

        dogs = parsedDbDogs.concat(dogs);
        isFirstRun = false;
        aDogHasBeenCreated = false;
        dogCache[cacheKey] = dogs;

        return { aDogHasBeenCreated, dogs };
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllDogs,
};
