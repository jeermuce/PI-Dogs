const { Dog, Temperament } = require("../db");
const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const { parseApiDogs, parseApiDog } = require("../utils/parseApiDogs");
const { Op } = require("sequelize");

let dogCache = {};
let apiCache = {};
let isFirstRun = true;
let aDogHasBeenCreated = false;

async function getDogById(id) {
    try {
        if (!Number(id)) {
            let dog = await Dog.findByPk(id, {
                include: {
                    model: Temperament,
                    attributes: ["name"],
                    through: {
                        attributes: [],
                    },
                },
            });
            console.log(dog);
            dog = parseDbDog(dog.dataValues);
            return dog;
        }
        const url = `https://api.thedogapi.com/v1/breeds/${id}?api_key=${API_KEY}`;

        let dog = await axios.get(url);
        dog = parseApiDog(dog.data, "dogById");
        return dog;
    } catch (error) {
        throw error;
    }
}

async function getDogByName(name) {
    try {
        //look for the dog in the db and bring all matches, look for the dog in the api,
        //put the results together and return them
        //if not found in either, return an error
        let dogs = await Dog.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`,
                },
            },
            include: {
                model: Temperament,
                attributes: ["name"],
                through: {
                    attributes: [],
                },
            },
        });
        dogs = dogs.map((dog) => dog.dataValues);
        let parsedDbDogs = dogs.map((dog) => {
            return parseDbDog(dog);
        });

        const url = `https://api.thedogapi.com/v1/breeds/search?q=${name}&api_key=${API_KEY}`;
        let apiDogs = await axios.get(url);
        apiDogs = parseApiDogs(apiDogs.data, "dogsByName");
        !parsedDbDogs.length && (parsedDbDogs = ["No matches in DB"]);
        !apiDogs.length && (apiDogs = ["No matches in API"]);

        dogs = [...parsedDbDogs, ...apiDogs];
        dogs.sort();

        return dogs;
    } catch (error) {
        throw error;
    }
}

async function getAllDogs(orderBy, orderDirection, page, limit) {
    try {
        const offset = (page - 1) * limit;
        let cacheKey = `${orderBy}-${orderDirection}`;

        let dogs = [];
        if (aDogHasBeenCreated) {
            dogCache = {};
        }

        allDataFrom = "db and api";
        if (!isFirstRun && !aDogHasBeenCreated) {
            //the cache s full if it's not the first run and no dog has been created
            allDataFrom = "dogsCache";
            aDogHasBeenCreated = false;
            return dogCache[cacheKey];
        } else if (apiCache[cacheKey]) {
            apiDataFrom = "apiCache";
            dogs = apiCache[cacheKey];
        } else {
            const url = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;
            dogs = await axios.get(url);
            dogs = parseApiDogs(dogs.data, "dogs");
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
            offset,
            limit,
        });
        dbDogs = dbDogs.map((dog) => dog.dataValues);

        const parsedDbDogs = dbDogs.map((dog) => {
            return parseDbDog(dog);
        });
        dogs.sort((a, b) => {
            if (orderDirection === "ASC") {
                return a[orderBy] > b[orderBy] ? 1 : -1;
            } else {
                return a[orderBy] < b[orderBy] ? 1 : -1;
            }
        });
        dogs.unshift(...parsedDbDogs);

        isFirstRun = false;
        aDogHasBeenCreated = false;
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
    getDogById,
    getDogByName,
};
