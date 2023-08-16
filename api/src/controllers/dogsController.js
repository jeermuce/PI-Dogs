const { Dog, Temperament } = require("../db");
const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const { parseApiDogs } = require("../utils/parseApiDogs");

const dogCache = {};
let apiCache = {};
let isFirstRun = true;
let aDogHasBeenCreated = false;

async function getAllDogs(orderBy, orderDirection, page, limit) {
    try {
        const offset = (page - 1) * limit;
        const cacheKey = `${orderBy}-${orderDirection}`;
        if (!isFirstRun && !aDogHasBeenCreated && !!dogCache[cacheKey]) {
            return dogCache[cacheKey];
        }
        let dogs = [];
        if (apiCache[cacheKey]) {
            dogs = apiCache[cacheKey];
        } else {
            const url = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;
            dogs = await axios.get(url);
            dogs = parseApiDogs(dogs.data, "dogs");
            apiCache[cacheKey] = dogs;
        }

        let dbDogs = await Dog.findAll({
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

        dogs.push(...parsedDbDogs);

        dogs.sort((a, b) => {
            if (orderDirection === "ASC") {
                return a[orderBy] > b[orderBy] ? 1 : -1;
            } else {
                return a[orderBy] < b[orderBy] ? 1 : -1;
            }
        });

        isFirstRun = false;
        dogCache[cacheKey] = dogs;

        return dogs;
    } catch (error) {
        throw error;
    }
}

async function createDog(dog) {
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
        let [createdDog] = await Dog.findOrCreate({
            where: {
                name,
            },
            defaults: {
                weight,
                weight_imperial,
                height,
                height_imperial,
                life_span,
                image,
            },
        });
        await addTemperamentsToDog(createdDog, temperaments);

        aDogHasBeenCreated = true;
        //grab the dog from the db again to get the temperaments
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

        createDog = parseDbDog(createdDog.dataValues);

        return createDog;
    } catch (error) {
        throw error;
    }
}

async function addTemperamentsToDog(dog, temperaments) {
    !!temperaments &&
        (await Promise.all(
            temperaments.map(async (temperament) => {
                const [createdTemperament] = await Temperament.findOrCreate({
                    where: {
                        name: temperament,
                    },
                });
                await dog.addTemperament(createdTemperament);
            })
        ));
}

function parseDbDog(dog) {
    const parsedTemperaments = dog.temperaments.map(
        (temperament) => temperament.name
    );
    return {
        id: dog.id,
        name: dog.name,
        weight: dog.weight,
        weight_imperial: dog.weight_imperial,
        height: dog.height,
        height_imperial: dog.height_imperial,
        life_span: dog.life_span,
        image: dog.image,
        temperaments: parsedTemperaments,
    };
}
module.exports = {
    getAllDogs,
    createDog,
};
