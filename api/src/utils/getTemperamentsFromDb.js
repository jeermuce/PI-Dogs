const { Temperament } = require("../db");

async function getTemperamentsFromDb() {
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

module.exports = {
    getTemperamentsFromDb,
};
