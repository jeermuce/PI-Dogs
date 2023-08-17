const { Temperament } = require("../db");
const { parseApiDogs } = require("../utils/parseApiDogs");
const axios = require("axios");
require("dotenv").config();

const { API_KEY } = process.env;
let isFirstRun = true;

async function getAllTemperaments() {
    try {
        if (!isFirstRun) {
            return await grabTemperamentsFromDB();
        } else {
            isFirstRun = false;
        }

        let dbTemperaments = await grabTemperamentsFromDB();

        if (dbTemperaments.length > 0) {
            return {
                temperaments: dbTemperaments,
                message: `${dbTemperaments.length} temperaments found in database`,
            };
        }

        const url = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;
        const apiDogs = await axios.get(url);
        const dogTemperaments = parseApiDogs(apiDogs.data, "temperaments");

        let allTemperaments = [];
        for (let temperament of dogTemperaments) {
            if (temperament.temperaments) {
                allTemperaments.push(...temperament.temperaments.split(", "));
            }
        }

        let uniqueTemperaments = Array.from(new Set(allTemperaments));

        await Temperament.bulkCreate(
            uniqueTemperaments.map((temperament) => ({ name: temperament })),
            { updateOnDuplicate: ["name"] }
        );

        return {
            temperaments: uniqueTemperaments,
            message: `${uniqueTemperaments.length} temperaments saved to database`,
        };
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllTemperaments,
};

async function grabTemperamentsFromDB() {
    const temperaments = await Temperament.findAll({
        attributes: ["name", "id"],
        order: [["name", "ASC"]],
    });
    const orderedTemperaments = temperaments.map((temperament) => temperament);
    return {
        temperaments: orderedTemperaments,
        message: `${temperaments.length} temperaments found in database`,
    };
}
