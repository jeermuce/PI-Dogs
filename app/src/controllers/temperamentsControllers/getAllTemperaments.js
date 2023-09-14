const { Temperament } = require("../../db");
const { parseApiDogs } = require("../../utils/parseApiDogs");
const { axiosCaller } = require("../../utils/axiosCaller");
const { getTemperamentsFromDb } = require("../../utils/getTemperamentsFromDb");

let isFirstRun = true;
async function getAllTemperaments() {
    try {
        if (!isFirstRun) {
            const dbTemperaments = (await getTemperamentsFromDb()).temperaments;
            return {
                totalCount: dbTemperaments.length,
                temperaments: dbTemperaments,
            };
        }

        const response = await axiosCaller("all");
        const dogTemperaments = parseApiDogs(response.data, "temperaments");

        let allTemperaments = [];
        for (let temperament of dogTemperaments) {
            if (temperament.temperaments) {
                allTemperaments.push(...temperament.temperaments.split(", "));
            }
        }

        let uniqueTemperaments = Array.from(new Set(allTemperaments));

        await Temperament.bulkCreate(
            uniqueTemperaments.map((temperament) => ({
                name: temperament,
                source: "api",
            })),
            { updateOnDuplicate: ["name"] }
        );
        const dbTemperaments = (await getTemperamentsFromDb()).temperaments;
        const totalCount = dbTemperaments.length;
        isFirstRun = false;

        return {
            totalCount,
            temperaments: dbTemperaments,
        };
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllTemperaments,
};
