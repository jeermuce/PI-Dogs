const { Temperament } = require("../db");
const parseApiDogs = require("../utils/parseApiDogs");
const axios = require("axios");
require("dotenv").config();

const { API_KEY } = process.env;
let isFirstRun = true;

async function getAllTemperaments() {
    try {
        if (!isFirstRun) {
            const temperaments = await Temperament.findAll({
                attributes: ["name"],
                order: [["name", "ASC"]],
            });
            const orderedTemperaments = temperaments.map(
                (temperament) => temperament.name
            );
            return {
                temperaments: orderedTemperaments,
                message: `${temperaments.length} temperaments found in database`,
            };
        } else {
            isFirstRun = false;
        }

        const url = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;
        const apiDogs = await axios.get(url);
        const dogTemperaments = parseApiDogs(apiDogs.data, "temperaments");
        const allTemperaments = [];

        for (const dog of dogTemperaments) {
            if (dog.temperaments.length > 0) {
                allTemperaments.push(...dog.temperaments);
            }
        }

        const uniqueTemperaments = [...new Set(allTemperaments)];

        await Temperament.bulkCreate(
            uniqueTemperaments.map((temperament) => ({ name: temperament })),
            { updateOnDuplicate: ["name"] }
        );

        uniqueTemperaments.sort();

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
